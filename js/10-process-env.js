console.log(process.env)

setImmediate(() => { console.log('setImmediate') })

debugger

setTimeout(()   => { console.log('setTimeout') }, 0)

for(let i = 0; i<100; i++ ) {
    console.log(i)
}

// setInterval(()  => { console.log('setInterval') }, 0)

process.nextTick(() => { console.log('nextTick') })