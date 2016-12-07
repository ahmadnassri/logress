import chalk from 'chalk'

const main = {
  ':info:': chalk.blue('ℹ'),
  ':success:': chalk.green('✔'),
  ':warning:': chalk.yellow('⚠'),
  ':error:': chalk.red('✖')
}

const win = {
  ':info:': chalk.blue('i'),
  ':success:': chalk.green('√'),
  ':warning:': chalk.yellow('‼'),
  ':error:': chalk.red('×')
}

export default process.platform === 'win32' ? win : main
