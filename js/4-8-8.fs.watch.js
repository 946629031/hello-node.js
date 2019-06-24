const fs = require('fs')

fs.watch('./', {recursive: true}, (eventType, filename) => {
    // 参数：目录path，是否递归(true则监听目录下的所有子文件夹)，回调函数里 改动类型(增删改)，被改动的文件名
    console.log(eventType, filename)
})