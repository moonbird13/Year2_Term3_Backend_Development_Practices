import fs from 'node:fs';
const filePath = "./hello.txt";

// Write to a file (asynchronously)
fs.writeFileSync(filePath, "Hello, Node.js beginner!");

// Read the file (asynchronously)
fs.readFile(filePath, "utf8", (err, content) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", content);
});
