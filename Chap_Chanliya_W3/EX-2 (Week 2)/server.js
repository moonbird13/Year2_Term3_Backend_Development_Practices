// server.js
const express = require('express');
const app = express();
const port = 8080;

// Update in to switch case
app.get('/', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the Home Page</h1>
                <p>This is a simple Node.js server.</p>
            </body>
        </html>
    `);
});

app.get('/about', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>About Us</title></head>
            <body>
                <h1>About Us</h1>
                <p>At CADT, we love Node.js!</p>
            </body>
        </html>
    `);
});

app.get('/contact', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Contact Us</title></head>
            <body>
                <h1>You can reach us via email!</h1>
            </body>
        </html>
    `);
});

app.get('/products', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Our Products</title></head>
            <body>
                <h1>Our Products</h1>
                <p>Buy One Get One Free!</p>
            </body>
        </html>
    `);
});

app.get('/projects', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Our Projects</title></head>
            <body>
                <h1>Our Projects</h1>
                <p>Here are our awesome projects!</p>
            </body>
        </html>
    `);
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


