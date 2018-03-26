'use strict'

const Cursor = require('./cursor')
const exit = require('./exit')
const Spinner = require('./spinner')
const symbols = require('./symbols')

module.exports = class Logress {
  constructor (opts) {
    opts = opts || {}
    const stream = opts.stream || process.stderr
    const spinner = opts.spinner || null
    const force = opts.force || false
    const cursor = opts.cursor

    this.force = force || ((stream && stream.isTTY) && !process.env.CI)

    let options = {
      configurable: false,
      enumerable: false,
      writable: true
    }

    // assign process exit hook
    exit(this.clean.bind(this))

    // private properties
    Object.defineProperties(this, {
      _total: Object.assign({ value: 1 }, options),
      _lines: Object.assign({ value: {} }, options),
      _indexes: Object.assign({ value: {} }, options),
      _spinners: Object.assign({ value: {} }, options),
      _intervals: Object.assign({ value: {} }, options),
      _stream: Object.assign({ value: stream }, options),
      _spinner: Object.assign({ value: spinner }, options),
      _cursor: Object.assign({ value: cursor || new Cursor(stream) }, options)
    })
  }

  line (id, text) {
    // default value
    id = id || 0

    if (text) this._lines[id] = text

    if (!this._lines[id]) {
      this._lines[id] = ''
    }

    return this._lines[id]
  }

  spinner (id, options) {
    // default value
    id = id || 0

    if (options) this._spinners[id] = new Spinner(null, options, this._spinner)

    if (!this._spinners[id]) {
      this._spinners[id] = new Spinner(this._spinner)
    }

    return this._spinners[id]
  }

  write (id, text, newline) {
    // default values
    id = id || 0
    text = text || ''

    let toMove = 0
    let index = this._indexes[id]

    if (index === undefined) {
      text += newline || '\n'
      index = this._total++
      this._indexes[id] = index
    } else {
      toMove = index - this._total
      this._stream.moveCursor(0, toMove)
      this._stream.clearLine()
    }

    this._stream.write(text)
    this._stream.moveCursor(-text.length, -toMove)

    return this
  }

  update (id, text, spinner) {
    // default values
    id = id || 0
    return this.write(id, `${this.spinner(id, spinner).frame()} ${this.line(id, text)}`)
  }

  start (id, text, spinner) {
    if (!this.force || this._intervals[id]) {
      return this
    }

    this._cursor.hide()

    this.update(id, text, spinner)
    this._intervals[id] = setInterval(this.update.bind(this, id), this.spinner(id, spinner).interval)

    return this
  }

  stop (id, text) {
    if (text) this.update(id, text)

    clearInterval(this._intervals[id])

    if (!this.force) {
      return this
    }

    this.spinner(id).reset()
    this._intervals[id] = null

    return this
  }

  clean () {
    for (let id in this._indexes) {
      this.stop(id)
    }
  }

  end (message) {
    this.clean()

    if (!this.force) {
      return this
    }

    this._cursor.show()
    this.write('[exit]', message)

    return this
  }

  set (id, text) {
    return this.stop(id).write(id, this.line(id, text))
  }

  // utility methods
  prefix (id, symbol, text) {
    return this.set(id, `${symbols[symbol] || symbol} ${this.line(id, text)}`)
  }

  info (id, text) {
    return this.prefix(id, ':info:', text)
  }

  succeed (id, text) {
    return this.prefix(id, ':success:', text)
  }

  success (id, text) {
    return this.prefix(id, ':success:', text)
  }

  warn (id, text) {
    return this.prefix(id, ':warning:', text)
  }

  warning (id, text) {
    return this.prefix(id, ':warning:', text)
  }

  fail (id, text) {
    return this.prefix(id, ':error:', text)
  }

  error (id, text) {
    return this.prefix(id, ':error:', text)
  }
}
