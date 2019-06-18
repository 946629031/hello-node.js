const EventEmitter = require('events')

class CustomEvent extends EventEmitter {}

const ce = new CustomEvent()

ce.on('error', (err, time, num) => {
    console.log(err)
    console.log(time)
    console.log(num)
})

ce.emit('error', new Error('oops!'), Date.now(), 123)