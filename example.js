var cont = require('continuable')
var race = require('continuable-race')
var delay = require('./delay')


// Example 1
var now = cont.of('now:      ')
var immediate = delay(cont.of('immediate:'), 0)
var later = delay(cont.of('later:    '), 100)
var timeout = delay(cont.error(new Error('Timeout')), 100)

now(log)
immediate(log)
later(log)
timeout(log)

function log(err, val) {
	console.log(err, val, Date.now())
}

// Example 2
var delayTime = Math.floor(Math.random() * 10) + 95
var timeout = delay(cont.error(new Error('Timeout')), 100)
var random = delay(cont.of('value'), delayTime)
race(timeout, random)(console.log)
