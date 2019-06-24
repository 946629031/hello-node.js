const fs = require('fs')

// fs.readFile('./4-8-2.fs.readFile.js', 'utf8', (err, data) =>{
//     if (err) throw err;

//     console.log(data)
// })

const data = fs.readFileSync('./4-8-2.fs.readFile.jss', 'utf8')

console.log(data)
