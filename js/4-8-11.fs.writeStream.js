const fs = require('fs')

const ws = fs.createWriteStream('./text.txt');  // 创建一个可写流

// 下面我们模拟，生产特别慢，每 200ms 才能生产一个数据以供消费
const tid = setInterval(() => {
    const num = parseInt(Math.random() * 10)
    console.log(num)
    if (num < 8) {
        ws.write(num + '')  // ws.write 往里面写入东西。转字符串
    } else {
        clearInterval(tid)
        ws.end()        // 写完了
    }
}, 200)

ws.on('finish', () => {     // 监听 写入结束事件 finish
    console.log('写完了')
})