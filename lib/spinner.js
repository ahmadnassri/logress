'use strict'

const chalk = require('chalk')
const spinners = require('cli-spinners')

module.exports = class Spinner {
  constructor (style, options, inherit) {
    style = style || 'spinner'
    options = options || {}
    inherit = inherit || spinners.dots

    let spinner = Object.assign({}, inherit)

    // attempt to look up from cli-spinners
    if (typeof style === 'string') {
      spinner = (process.platform === 'win32') ? spinners.line : (spinners[style] || spinners.dots)
    } else {
      Object.assign(spinner, style)
    }

    let defaults = { color: 'cyan', interval: 100, frames: [] }

    Object.assign(defaults, spinner, options)

    if (defaults.frames === undefined) {
      throw new Error('Spinner must define `frames`')
    }

    this.index = 0
    this.color = defaults.color
    this.frames = defaults.frames
    this.interval = defaults.interval
  }

  frame () {
    let frame = this.frames[this.index]

    if (this.color) {
      frame = chalk[this.color](frame)
    }

    this.index = ++this.index % this.frames.length

    return frame
  }

  reset () {
    this.index = 0

    return this
  }
}
