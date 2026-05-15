// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    // Update in to switch case
    switch (true) {
        case url === '/' && method === 'GET':
            res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `)
        break; 
        case url === '/about' && method === 'GET':
            res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>About Us</title></head>
                <body>
                    <h1>About Us</h1>
                    <p>At CADT, we love Node.js!</p>
                </body>
            </html>
        `)
        break; 
        case url === '/contact' && method === 'GET': 
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Contact Us</title></head>
                <body>
                    <h1>You can reach us via email!</h1>
                </body>
            </html>
        `)
        break; 
        case url === '/products' && method === 'GET':
        return res.end(`
            <html>
                <head><title>Our Products</title></head>
                <body>
                    <h1>Our Products</h1>
                    <p>Buy One Get one Free!</p>
                </body>
            </html>
        `)
        break; 
        case url === '/products' && method === 'GET':
        return res.end(`
            <html>
                <head><title>Our Products</title></head>
                <body>
                    <h1>Our Products</h1>
                    <p>Buy One Get one Free!</p>
                </body>
            </html>
        `)
        break; 
        case url === '/projects' && method === 'GET':
        return res.end(`
            <html>
                <head><title>Our Projects</title></head>
                <body>
                    <h1>Our Projects</h1>
                    <p>Here are our awesome projects!</p>
                </body>
            </html>
        `)
        break; 
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
        }
    });

    // Using If statements
//     if (url === '/' && method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         return res.end(`
//             <html>
//                 <head><title>Home</title></head>
//                 <body>
//                     <h1>Welcome to the Home Page</h1>
//                     <p>This is a simple Node.js server.</p>
//                 </body>
//             </html>
//         `);
//     }
//     // Implement more routes here
//     if (url === '/about' && method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         return res.end(`
//             <html>
//                 <head><title>About Us</title></head>
//                 <body>
//                     <h1>About Us</h1>
//                     <p>At CADT, we love Node.js!</p>
//                 </body>
//             </html>
//         `);
//     }
//     else if (url === '/contact' && method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         return res.end(`
//             <html>
//                 <head><title>Contact Us</title></head>
//                 <body>
//                     <h1>You can reach us via email!</h1>
//                 </body>
//             </html>
//         `);
//     }
//     else if (url === '/products' && method === 'GET') {
//         return res.end(`
//             <html>
//                 <head><title>Our Products</title></head>
//                 <body>
//                     <h1>Our Products</h1>
//                     <p>Buy One Get one Free!</p>
//                 </body>
//             </html>
//         `);
//     }
//     else if (url === '/projects' && method === 'GET') {
//         return res.end(`
//             <html>
//                 <head><title>Our Projects</title></head>
//                 <body>
//                     <h1>Our Projects</h1>
//                     <p>Here are our awesome projects!</p>
//                 </body>
//             </html>
//         `);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         return res.end('404 Not Found');
//     }
// });

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});


