'use strict'

const exit = require('./exit')

module.exports = class Cursor {
  constructor (stream) {
    this.stream = stream || process.stdout

    // assign process exit hook
    exit({
      exit: this.restore.bind(this),
      sigint: this.restore.bind(this, true, 2),
      sigterm: this.restore.bind(this, true, 15)
    })
  }

  show () {
    this.stream.write('\u001b[?25h')
  }

  hide () {
    this.stream.write('\u001b[?25l')
  }

  restore (stream, exit, signal) {
    this.show()

    if (exit === true) {
      process.exit(128 + signal)
    }
  }
}
