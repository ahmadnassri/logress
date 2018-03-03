'use strict'

const Cursor = require('../lib/cursor')
const Logress = require('../lib/index')
const PassThrough = require('stream').PassThrough
const Spinner = require('../lib/spinner')
const stripAnsi = require('strip-ansi')
const tap = require('tap')

const noop = () => {}

process.setMaxListeners(100)

function Stream () {
  const stream = new PassThrough()
  stream.isTTY = true
  stream.clearLine = noop
  stream.moveCursor = noop
  stream.chunks = []
  stream.body = ''
  stream.on('data', (chunk) => stream.chunks.push(chunk))
  stream.on('finish', () => {
    stream.body = Buffer.concat(stream.chunks).toString()
    stream.body = stripAnsi(stream.body)
    stream.body = stream.body.replace(/\n+$/, '')
  })

  return stream
}

const force = true
const cursor = new Cursor(Stream())
const spinner = new Spinner({
  color: false,
  frames: ['.']
})

tap.test('default values', assert => {
  assert.plan(5)

  const progress = new Logress({ cursor })

  assert.same(progress._total, 1)
  assert.same(progress._lines, {})
  assert.same(progress._indexes, {})
  assert.same(progress._spinners, {})
  assert.same(progress._intervals, {})
})

tap.test('chainable calls', assert => {
  assert.plan(1)

  const stream = Stream()

  new Logress({ stream, spinner, cursor, force })
    .start(1, 'foo')
    .end()

  stream.end(() => assert.equal(stream.body, '. foo'))
})

tap.test('write one line', assert => {
  assert.plan(1)

  const stream = Stream()

  new Logress({ stream, spinner, cursor, force })
    .start(1, 'foo')
    .end()

  stream.end(() => assert.equal(stream.body, '. foo'))
})

tap.test('write two lines', assert => {
  assert.plan(1)

  const stream = Stream()

  new Logress({ stream, spinner, cursor, force })
    .start(1, 'foo')
    .start(2, 'bar')
    .end()

  stream.end(() => assert.equal(stream.body, '. foo\n. bar'))
})

tap.test('ignore consecutive calls to `.start()`', assert => {
  assert.plan(1)

  const stream = Stream()

  const progress = new Logress({ stream, cursor, force })
    .start(1, 'foo')
    .start(1, 'foo')
    .start(1, 'foo')
    .start(1, 'foo')
    .end()

  assert.equal(Object.keys(progress._indexes).length, 2)
})

tap.test('.success()', assert => {
  assert.plan(1)

  const stream = Stream()

  new Logress({ stream, cursor, force })
    .start(1, 'foo')
    .succeed(1)
    .end()

  stream.end(() => assert.match(stream.body, /✔|√ foo/))
})

tap.test('.symbol()', assert => {
  assert.plan(1)

  const stream = Stream()

  new Logress({ stream, cursor, force })
    .start(1, 'info')
    .start(2, 'succeed')
    .start(3, 'success')
    .start(4, 'warn')
    .start(5, 'warning')
    .start(6, 'fail')
    .start(7, 'error')

    .info(1)
    .succeed(2)
    .success(3)
    .warn(4)
    .warning(5)
    .fail(6)
    .error(7)

    .end()

  const expected = ['ℹ|i info', '✔|√ succeed', '✔|√ success', '⚠|‼ warn', '⚠|‼ warning', '✖|× fail', '✖|× error']

  stream.end(() => assert.match(stream.body, new RegExp(expected.join('\n'))))
})

tap.test('.set()', assert => {
  assert.plan(1)

  const stream = Stream()

  new Logress({ stream, cursor, force })
    .set(1, '@')
    .end()

  stream.end(() => assert.equal(stream.body, '@'))
})

tap.test('.stop()', assert => {
  assert.plan(1)

  const stream = Stream()

  new Logress({ stream, spinner, cursor, force })
    .start(1, 'foo')
    .stop(1, 'bar')
    .end()

  stream.end(() => assert.equal(stream.body, '. foo\n. bar'))
})
