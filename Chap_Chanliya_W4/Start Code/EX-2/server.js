import express from 'express';
import logger from './middlewares/logging.js';
import postRouter from './routes/postRoute.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(logger);
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.json(articles)
});


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});