import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let articles = [
  {
    id: 1,
    title: 'Welcome to the News App',
    content: 'This is a sample article. Use the form to add more articles.',
    journalistId: '1',
    categoryId: '1',
  },
];
let nextId = 2;

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.get('/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find(item => item.id === id);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(article);
});

app.post('/articles', (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const article = {
    id: nextId++,
    title,
    content,
    journalistId,
    categoryId,
  };
  articles.push(article);
  res.status(201).json(article);
});

app.put('/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, content, journalistId, categoryId } = req.body;
  const index = articles.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Article not found' });
  }
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  articles[index] = { id, title, content, journalistId, categoryId };
  res.json(articles[index]);
});

app.delete('/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = articles.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Article not found' });
  }
  articles.splice(index, 1);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
