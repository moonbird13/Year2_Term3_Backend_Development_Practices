
import express from 'express';
import courses from './course.js';

const app = express();
const PORT = 3001;

// Global middware to log request 
app.use((req, res, next) => {

    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Query Parameters:', req.query);
    console.log('Timestamp:', new Date().toISOString());

    next();
});

//validate query param 
const validateCredits = (req, res, next) => {

    const { minCredits, maxCredits } = req.query;

    const isValidInt = (value) => {
        return Number.isInteger(Number(value));
    };

    switch (true) {

        // minCredits is not a number (abc case)
        case (minCredits !== undefined && !isValidInt(minCredits)):
            return res.status(400).json(
                '400 Bad Request'
            );

        // maxCredits is not a number
        case (maxCredits !== undefined && !isValidInt(maxCredits)):
            return res.status(400).json(
                '400 Bad Request'
            );

        // invalid range (4 > 2 case)
        case (
            minCredits !== undefined &&
            maxCredits !== undefined &&
            Number(minCredits) > Number(maxCredits)
        ):
            return res.status(400).json(
                '400 Bad Request'
            );

        default:
            next();
    }
};

// Route

app.get('/departments/:dept/courses', validateCredits,(req, res) => {
   
    const { dept } = req.params;

    const {
        level,
        minCredits,
        maxCredits,
        semester,
        instructor
    } = req.query;

  

  // Include Invalid credit range
const FilterCourses = courses.filter(course => {

        if (course.department !== dept) return false;
        if (level && course.level !== level) return false;
        if (minCredits !== undefined && course.credits < minCredits) return false;
        if (maxCredits !== undefined && course.credits > maxCredits) return false;
        if (semester && course.semester !== semester) return false;
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;

        return true;
    });

    res.json({
            results: FilterCourses,
            total: FilterCourses.length
        });
    
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});