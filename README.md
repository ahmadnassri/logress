# Logress [![version][npm-version]][npm-url] [![License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Downloads][npm-downloads]][npm-url] [![Coverage Status][codeclimate-coverage]][codeclimate-url]

> Log your progress, with Logress!

![demo](demo/demo.gif)

## Install

```bash
npm install --production --save logress
```

## Usage

```javascript
const Logress = require('logress')

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
**`stream`**  | ✖        | [`WritableStream`][docs-stream] | a Stream to write the output   | `process.stderr`
**`spinner`** | ✖        | `String`, `Object`              | a Default [Spinner](#spinners) | `dots`          

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
**`message`** | ✖        | `String` | goodbye text | `-`    

```javascript
new Logress().end('bye!')
```

### `log.start(id[, text][, spinner])`

> starts a new spinner instance on the line, sets the line text. _(will create the line if it doesn't exit)_

argument      | required | type               | description                                     | default                 
------------- | -------- | ------------------ | ----------------------------------------------- | ------------------------
**`id`**      | ✔        | `String`           | line identifier                                 | `-`                     
**`text`**    | ✖        | `String`           | line text                                       | `-`                     
**`spinner`** | ✖        | `String`, `Object` | assign a new [Spinner](#spinners) for this line | inherits default Spinner

### `log.update(id[, text][, spinner])`

> similar to `log.start()` but will update existing spinner rather than start a new one

argument      | required | type               | description                                     | default                 
------------- | -------- | ------------------ | ----------------------------------------------- | ------------------------
**`id`**      | ✔        | `String`           | line identifier                                 | `-`                     
**`text`**    | ✖        | `String`           | line text                                       | `-`                     
**`spinner`** | ✖        | `String`, `Object` | assign a new [Spinner](#spinners) for this line | inherits default Spinner

```javascript
const log = new Logress({ spinner: 'monkey' })

log.start('ape', 'I like bananas', { color: 'yellow' })
log.start('angry', 'an angry monkey!', { color: 'red' })
```

### `log.stop(id[, text])`

> terminate spinner at line: `id`, optionally change the text

argument   | required | type     | description     | default
---------- | -------- | -------- | --------------- | -------
**`id`**   | ✔        | `String` | line identifier | `-`    
**`text`** | ✖        | `String` | line text       | `-`    

```javascript
log.stop('ape')
log.stop('angry', 'no more angry monkey!')
```

### `log.set(id[, text])`

> sets the line text (overwriting any existing spinner). _(will create the line if it doesn't exit)_

argument   | required | type     | description     | default
---------- | -------- | -------- | --------------- | -------
**`id`**   | ✔        | `String` | line identifier | `-`    
**`text`** | ✖        | `String` | line text       | `-`    

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
**`id`**     | ✔        | `String` | line identifier | `-`           
**`prefix`** | ✔        | `String` | line prefix     | `-`           
**`text`**   | ✖        | `String` | line text       | previous value

```javascript
log.prefix('line1', '*')
```

### `log.info(id, [, text])`

> alias to \`log.prefix(id, 'ℹ', text)

### `log.success(id, [, text])`

> alias to \`log.prefix(id, '✔', text)

### `log.succeed(id, [, text])`

> alias to \`log.prefix(id, '✔', text)

### `log.warning(id, [, text])`

> alias to \`log.prefix(id, '⚠', text)

### `log.warn(id, [, text])`

> alias to \`log.prefix(id, '⚠', text)

### `log.error(id, [, text])`

> alias to \`log.prefix(id, '✖', text)

### `log.fail(id, [, text])`

> alias to \`log.prefix(id, '✖', text)

### Spinners

You can use any of the [provided spinners][cli-spinners] or create your own, See [`demo/index.js`][demo] in this repo if you want to test out different spinners.

---
> License: [ISC][license-url] &bull; 
> Copyright: [ahmadnassri.com](https://www.ahmadnassri.com) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/npm-starter-kit.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/npm-starter-kit
[travis-image]: https://img.shields.io/travis/ahmadnassri/npm-starter-kit.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/npm-starter-kit
[npm-version]: https://img.shields.io/npm/v/npm-starter-kit.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/npm-starter-kit.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/npm-starter-kit
[codeclimate-coverage]: https://api.codeclimate.com/v1/badges/[REPLACEME]/test_coverage?style=flat-square


[cli-spinners]: https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json
[docs-stream]: https://nodejs.org/api/stream.html#stream_writable_streams
[demo]: demo/index.js
