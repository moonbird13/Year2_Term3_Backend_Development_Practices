// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    // Implement form submission handling
    if (url === '/contact' && method === 'POST') {
        let body = '';
        
        // Capture data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

    
        // When data transfer is complete
        req.on('end', () => {
            console.log('Received form data:', body);
            
            // Parse application
            const parameter= new URLSearchParams(body);
            const name = parameter.get('name');
            
            console.log('Name:', name);
            
            // Write name to submissions.txt
            const filePath = path.join(__dirname, 'submissions.txt');
            fs.appendFile(filePath, name + '\n', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error saving submission');
                }
                
                // Send successful response
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <body>
                            <h1>Your submission has been recorded.</h1>
                        </body>
                    </html>
                `);
            });
        });
        return;
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
