const fs = require('fs')  // 引用系统内置模块不用写路径，直接写模块名即可

const result = fs.readFile('./06-fs.js', (err, data) => {  // readFile() 是异步操作，当前是没有返回结果的
    if (err) {  // 如果网络错误 或者 路径错误... 等其他原因 则会报错
        console.log(err)
    }else{      // 如果没错误，则能读取到文件
        console.log(data.toString())    // 将buffer 转换成字符串
    }
})

console.log(result)