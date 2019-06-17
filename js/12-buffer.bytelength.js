const str = '我+你=我爱你'

console.log(`${str}: ${str.length} 个字符, `+
            `${Buffer.byteLength(str, 'utf8')} 个字节`)


console.log(Buffer.isBuffer({}))
console.log(Buffer.isBuffer(Buffer.from([1,2,3])))



const buf1 = Buffer.from('This ')
const buf2 = Buffer.from('is ')
const buf3 = Buffer.from('a ')
const buf4 = Buffer.from('test ')
const buf5 = Buffer.from('!')

const buf = Buffer.concat([buf1, buf2, buf3, buf4, buf5])

console.log(buf.toString())




const buf6 = Buffer.from('This is a test !')
console.log(buf6.length)  // 16
// buf.length 它返回的值，不一定是指里面有多少个字符，而是 buffer 实际占用字节数
// 例如，我申请10个长度的 Buffer，但是我只在里面放一个字符，那么它仍然长度为10
const buf7 = Buffer.alloc(10)
buf7[0] = 2
console.log(buf7.length)    // 10


console.log(buf6.toString()) // This is a test !
console.log(buf.toString('base64'))     // This is a test !