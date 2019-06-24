const fs = require('fs')
const promisify = require('util').promisify

const read = promisify(fs.readFile)  // fs.readFile(filePath, callback) 是一个异步操作，这里我们把它改成了 promise

// read('./4-8-12.promisify.js').then(data => {
//     console.log(data.toString())
// }).catch(err => {
//     console.log(err)
// })


async function test(){
    try{
        const content = await read('./4-8-12.promisify.js')
        console.log(content.toString())
    } catch (err) {
        console.log(err)
    }
}

test()