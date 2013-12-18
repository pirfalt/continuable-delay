# continuable-delay

Delay a continuable. Just like setTimeout/setImmediate.

Mostly useful for turning sync continuables into async. Also useful to create timeouts to be used with `continuable-race`.

## `delay(continuable, time)`
```
var later = delay(continuable, time)
later(function (err, val) {
  if (err) return console.error(err)
  console.log(val)
})
```

## Example
Show of.
```
var cont = require('continuable')
var delay = require('conintuable-delay')

var now = cont.of('now:      ')
var immediate = delay(cont.of('immediate:'))
var later = delay(cont.of('later:    '), 100)
var timeout = delay(cont.error(new Error('Timeout')), 100)

now(log)
immediate(log)
later(log)
timeout(log)

function log(err, val) {
    console.log(err, val, Date.now())
}
```

Timeout example.
```
var race = require('continuable-race')

var delayTime = Math.floor(Math.random() * 10) + 95
var random = delay(cont.of('Some good value'), delayTime)
var timeout = delay(cont.error(new Error('Timeout')), 100)

race(timeout, random)(console.log) // Get whatever completes first
```
