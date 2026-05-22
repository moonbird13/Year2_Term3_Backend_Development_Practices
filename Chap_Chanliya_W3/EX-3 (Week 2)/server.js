const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});


app.get('/', (req, res) => {
    console.log("Home route visited");
    res.status(200).send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the Home Page</h1>
            </body>
        </html>
    `);
    
});

app.get('/contact', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Contact Us</title></head>
            <body>
                <h1>Contact Us</h1>
                <form method="POST" action="/contact">
                    <input type="text" name="name" placeholder="Your name" required />
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `);
});

app.post('/contact', (req, res) => {
    const name = req.body.name || 'Guest';
    console.log('Name:', name);

    const filePath = path.join(__dirname, 'submissions.txt');
    console.log('Writing submission to', filePath);
    fs.appendFile(filePath, name + '\n', (err) => {
        if (err) {
            console.error('Error saving submission:', err);
            return res.status(500).send(`
                <html>
                    <head><title>Error</title></head>
                    <body>
                        <h1>Submission failed</h1>
                        <p>Name save failed.</p>
                    </body>
                </html>
            `);
        }

        console.log('Saved submission:', name);
        res.status(200).send(`
            <html>
                <head><title>Submission Received</title></head>
                <body>
                    <h1>Your name has been submitted successfully.</h1>
                    <a href="/contact">Submit another name</a>
                </body>
            </html>
        `);
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});


