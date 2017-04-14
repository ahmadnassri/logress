# Logress [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> Log your progress, with Logress!

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

![demo](demo/demo.gif)

## Install

```bash
npm install --only=production --save logress
```

## Usage

```javascript
import Logress from 'logress'

const log = new Logress()

log.start(1, 'Loading ...')

setTimeout(() => log.update(1, 'still loading!', { color: 'yellow' }), 1000)
setTimeout(() => log.start(2, 'monkeys are cuter than unicorns!', 'monkey'), 2000)
```

## API

### `constructor(options = { stream = process.stderr, spinner = 'dots' })`

> **Note**: It will gracefully not do anything when there's no TTY or when in a CI.

option        | required | type                            | description                    | default
------------- | -------- | ------------------------------- | ------------------------------ | ----------------
**`stream`**  | `✖`      | [`WritableStream`][docs-stream] | a Stream to write the output   | `process.stderr`
**`spinner`** | `✖`      | `String`, `Object`              | a Default [Spinner](#spinners) | `dots`

```javascript
const log = new Logress({
  stream: process.stdout,
  spinner: 'bouncingBar'
})
```

### `log.end([message])`

> terminates all spinners, restores the cursor, optionally sends a goodbye message out

argument      | required | type     | description  | default
------------- | -------- | -------- | ------------ | -------
**`message`** | `✖`      | `String` | goodbye text | ``

```javascript
new Logress().end('bye!')
```

### `log.start(id[, text][, spinner])`

> starts a new spinner instance on the line, sets the line text. _(will create the line if it doesn't exit)_

argument      | required | type               | description                                     | default
------------- | -------- | ------------------ | ----------------------------------------------- | ------------------------
**`id`**      | `✔`      | `String`           | line identifier                                 | ``
**`text`**    | `✖`      | `String`           | line text                                       | ``
**`spinner`** | `✖`      | `String`, `Object` | assign a new [Spinner](#spinners) for this line | inherits default Spinner

```javascript
const log = new Logress({ spinner: 'monkey' })

log.start('ape', 'I like bananas', { color: 'yellow' })
log.start('angry', 'an angry monkey!', { color: 'red' })
```

### `log.stop(id[, text])`

> terminate spinner at line: `id`, optionally change the text

argument   | required | type     | description     | default
---------- | -------- | -------- | --------------- | -------
**`id`**   | `✔`      | `String` | line identifier | ``
**`text`** | `✖`      | `String` | line text       | ``

```javascript
log.stop('ape')
log.stop('angry', 'no more angry monkey!')
```

### `log.set(id[, text])`

> sets the line text (overwriting any existing spinner). _(will create the line if it doesn't exit)_

argument   | required | type     | description     | default
---------- | -------- | -------- | --------------- | -------
**`id`**   | `✔`      | `String` | line identifier | ``
**`text`** | `✖`      | `String` | line text       | ``

```javascript
log.set('new', 'custom text')
```

### `log.prefix(id, prefix, [, text])`

> - will terminating any existing spinner
> - replaces spinner with a custom prefix
> - optionally sets a new line text
> - will create the line if it doesn't exit
> - will match `prefix` against (`:info:`, `:success:`, `:warning:`, `:error:`) and replace with an emoji if matched

argument     | required | type     | description     | default
------------ | -------- | -------- | --------------- | --------------
**`id`**     | `✔`      | `String` | line identifier | ``
**`prefix`** | `✔`      | `String` | line prefix     | ``
**`text`**   | `✖`      | `String` | line text       | previous value

```javascript
log.prefix('line1', '*')
```

### `log.info(id, [, text])`

> alias to `log.prefix(id, 'ℹ', text)

### `log.success(id, [, text])`

> alias to `log.prefix(id, '✔', text)

### `log.succeed(id, [, text])`

> alias to `log.prefix(id, '✔', text)

### `log.warning(id, [, text])`

> alias to `log.prefix(id, '⚠', text)

### `log.warn(id, [, text])`

> alias to `log.prefix(id, '⚠', text)

### `log.error(id, [, text])`

> alias to `log.prefix(id, '✖', text)

### `log.fail(id, [, text])`

> alias to `log.prefix(id, '✖', text)

### Spinners

You can use any of the [provided spinners][cli-spinners] or create your own, See `example.js` in this repo if you want to test out different spinners.

----
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[cli-spinners]: https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/logress.svg?style=flat-square
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/logress.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/logress
[david-image]: https://img.shields.io/david/ahmadnassri/logress.svg?style=flat-square
[david-url]: https://david-dm.org/ahmadnassri/logress
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/logress/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/logress
[docs-stream]: https://nodejs.org/api/stream.html#stream_writable_streams
[license-url]: http://choosealicense.com/licenses/isc/
[npm-downloads]: https://img.shields.io/npm/dm/logress.svg?style=flat-square
[npm-license]: https://img.shields.io/npm/l/logress.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/logress
[npm-version]: https://img.shields.io/npm/v/logress.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/ahmadnassri/logress.svg?style=flat-square
[travis-url]: https://travis-ci.org/ahmadnassri/logress
