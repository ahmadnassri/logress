import Logress from './src'
import exit from './src/exit'
import Spinner from './src/spinner'

let delay = 0
let timers = []

let log = new Logress()
let bar = new Spinner('bouncingBar', { color: 'magenta' })
let dots = new Spinner('dots', { color: 'yellow' })

log.start('hello', 'hold on, let me get myself ready')

let examples = [
  () => log.update('hello', 'almost done ...', dots),
  () => log.update('hello', 'almost done ...', { color: 'red' }),
  () => log.success('hello', "okay, I'm ready!"),
  () => log.info('info1', 'lets start with something simple'),
  () => log.info('info2', 'you can create new rows'),
  () => log.info('info3', 'as many as you want!'),
  () => log.warn('info1', 'you can also update any row'),
  () => log.start('info2', 'start a new animation', 'line'),
  () => log.fail('info3', 'or change the symbol'),
  () => log.start('info2', 'pick from many animations', bar),
  () => log.start('info3', 'or make your own', { interval: 140, frames: ['🚶 ', '🏃 '], color: 'gray' }),
  () => log.set('info4', "or maybe you, don't like animations?"),
  () => log.start('info5', "that's okay, there is lots to explore!", 'smiley'),
  () => log.start('last', "and don't forget to star this repo!", new Spinner('hearts', { color: 'red' })),
  () => log.end('bye!')
]

for (let example of examples) {
  delay += 2000
  timers.push(setTimeout(example, delay))
}

// clean up in case of early exit
exit(() => timers.forEach(clearTimeout))
