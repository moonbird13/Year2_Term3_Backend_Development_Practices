import express from 'express';
import logger from './middlewares/logging.js';
import userRouter from './routes/postRoute.js';

const app = express();
app.use(express.json());

app.use(logger);
app.use('/users', userRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


