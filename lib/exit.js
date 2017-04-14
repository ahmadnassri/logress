'use strict'

module.exports = function exit (listener) {
  let events = {
    exit: listener,
    sigint: listener,
    sigterm: listener
  }

  if (typeof listener === 'object') {
    events = listener
  }

  process.once('exit', events.exit)
  process.once('SIGINT', events.sigint || events.exit)
  process.once('SIGTERM', events.sigterm || events.exit)
}
