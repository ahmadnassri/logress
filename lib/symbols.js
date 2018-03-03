const { blue, green, yellow, red } = require('chalk')

const main = {
  ':info:': blue('ℹ'),
  ':success:': green('✔'),
  ':warning:': yellow('⚠'),
  ':error:': red('✖')
}

const win = {
  ':info:': blue('i'),
  ':success:': green('√'),
  ':warning:': yellow('‼'),
  ':error:': red('×')
}

module.exports = process.platform === 'win32' ? win : main
