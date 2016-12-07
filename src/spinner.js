import chalk from 'chalk'
import spinners from 'cli-spinners'

export default class Spinner {
  constructor (style = 'spinner', options = {}, inherit = spinners.dots) {
    let spinner = Object.assign({}, inherit)

    // attempt to look up from cli-spinners
    if (typeof style === 'string') {
      spinner = (process.platform === 'win32') ? spinners.line : (spinners[style] || spinners.dots)
    } else {
      Object.assign(spinner, style)
    }

    let { color = 'cyan', interval = 100, frames } = Object.assign({}, spinner, options)

    if (frames === undefined) {
      throw new Error('Spinner must define `frames`')
    }

    this.index = 0
    this.color = color
    this.frames = frames
    this.interval = interval
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
