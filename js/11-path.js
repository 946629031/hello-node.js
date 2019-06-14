const path = require('path')

console.log(path.join('/usr/', '/local', '/bin/'))
console.log(path.join('/usr', '../local', 'bin/'));


console.log(path.resolve('./'));

const filePath = '/usr/local/bin/no.txt'

console.log(path.basename(filePath));   // 文件名
console.log(path.dirname(filePath));    // 所在文件夹路径
console.log(path.extname(filePath));    // 拓展名

const filePath2 = '/usr/local/node_modules/n/package.json'
console.log(path.parse(filePath2));   // 