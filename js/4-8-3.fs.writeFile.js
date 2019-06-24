const fs = require('fs')

fs.writeFile('./text.txt', 'this is a test', {encoding: 'utf8'}, err => {
    // 参数：filePath/filename, 写入的内容，编码，回调函数
    if (err) throw err;

    console.log('写入成功')
})