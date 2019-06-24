const fs = require('fs')

fs.stat('./4-8-4.fs.stat.js', (err, stats) => {
    if (err) {
        console.log('文件不存在')
        throw err;
        return;
    }

    console.log(stats.isFile())         // 是否是文件
    console.log(stats.isDirectory())    // 是否是目录

    console.log(stats)
})