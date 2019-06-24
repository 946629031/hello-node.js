const fs = require('fs')

fs.unlink('./11111.js', (err) => {  // fs.unlink 是删除文件
    if (err) throw err;
    console.log('成功删除 ./hello')
})