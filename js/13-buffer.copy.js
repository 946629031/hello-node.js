const buf = Buffer.from('中文字符串！')

for(let i = 0; i < buf.length; i += 5 ){    // 把字符串拆分，每5个字节分成一个
    const b = Buffer.allocUnsafe(5)
    buf.copy(b, 0, i)

    console.log(b.toString())
}

// 打印：
// 中�
// �字�
// ��串
// ！




const StringDecoder = require('string_decoder').StringDecoder;  // StringDecoder 也是node的内置模块
const decoder = new StringDecoder('utf8');  // 实例化 StringDecoder, 并传入解码方式

for(let i = 0; i < buf.length; i += 5 ){
    const b = Buffer.allocUnsafe(5)
    buf.copy(b, 0, i)

    console.log(decoder.write(b))
}
// 打印：
// 中
// 文字
// 符串
// ！
