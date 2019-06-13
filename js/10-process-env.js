console.log(process.env)

setImmediate(() => {
    console.log('setImmediate')
})

setTimeout(() => {
    console.log('setTimeout')
}, 0)

setInterval(() => {
    console.log('setInterval')
}, 0)

process.nextTick(() => {
    console.log('nextTick')
})