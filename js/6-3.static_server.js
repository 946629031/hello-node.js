const fs = require('fs');
const path = require('path');
const http = require('http');

const hostname = '127.0.0.1';
const port = 9555;
const root = process.cwd();

const server = http.createServer((req, res) => {
    const url = req.url;
    const filePath = path.join(root, url);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type' ,'text/plain');
            res.end(`${filePath} is not a directory or file`);
            return;
        }

        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            fs.readdir(filePath, (err, files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(files.join(','));
            })
        }
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});