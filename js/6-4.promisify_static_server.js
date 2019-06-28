const http = require('http');
const path = require('path');
const fs = require('fs');

const promisify = require('util').promisify;    // 引入 promisify
const stat = promisify(fs.stat);                // 异步函数 promisify 化
const readdir = promisify(fs.readdir);          // 异步函数 promisify 化

const hostname = '127.0.0.1';
const port = 9556;
const root = __dirname;
// const root = process.cwd();

const server = http.createServer((req, res) => {
    const filePath = path.join(root, req.url);

    handle(req, res, filePath);
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
})

async function handle(req, res, filePath){
    try{
        const stats = await stat(filePath);     // 因为 promisify 后，要 await 异步函数回调，所以才把主逻辑抽离到 async function 中

        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files =  readdir(filePath);    // 这里如果有错误，统一让它抛到外层的 try catch 去捕获异常 就好了，这里不做处理了
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(','));
        }
    } catch (err) {
        console.error(err);

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file \n ${err}`);
    }
}