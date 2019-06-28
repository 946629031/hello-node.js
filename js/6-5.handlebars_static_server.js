const http = require('http');
const Handlebars = require('handlebars');       // 引入 handlebars
const path = require('path');
const fs = require('fs');
const colors = require('colors');
const mime = require('./6-7.mime');

const promisify = require('util').promisify;    // 引入 promisify
const stat = promisify(fs.stat);                // 异步函数 promisify 化
const readdir = promisify(fs.readdir);          // 异步函数 promisify 化

const hostname = '127.0.0.1';
const port = 9556;
const root = __dirname;
// const root = process.cwd();

const tplPath = path.join(__dirname, './template/dir.html');
const source = fs.readFileSync(tplPath);    // 读取模板文件
// 为什么用同步读取？  1.下面的逻辑要正常工作，需要这一步为前提 
// 2.只需要读取一次即可，之后直接在内存中读取即可，因为每次的处理 模板文件都不变
const template = Handlebars.compile(source.toString());   // 生成 template

const server = http.createServer((req, res) => {
    const filePath = path.join(root, req.url);
    console.log('filePath', filePath.red)

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
            res.setHeader('Content-Type', mime(filePath));
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);    // 这里如果有错误，统一让它抛到外层的 try catch 去捕获异常 就好了，这里不做处理了
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            // res.end(files.join(','));

            const dir = path.relative(root, filePath);
            const data = {      // 制作 template 数据
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {    // 求每个文件的 文件类型
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            }
            console.log('filePath', filePath.green)     // 这里的 .green 是利用 colors库 使得输出到 命令行里的字体变色
            console.log('dir', dir.green)
            res.end(template(data));    // 将数据和模板 返回给客户端
        }
    } catch (err) {
        // console.error(err);

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file \n ${err}`);
    }
}