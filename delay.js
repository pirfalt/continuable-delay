module.exports = delay

// delay := (Continuable<A>, Number) => Continuable<A>
function delay(cont, time) {
  time = Number(time)
  if (Number.isNaN(time)) time = 0

  return function delayedContinuation(cb) {
    function run() {
      cont(cb)
    }
    
    if (time > 0) {
      setTimeout(run, time)
    } else {
      setImmediate(run)
    }
  }
}
