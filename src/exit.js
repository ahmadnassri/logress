export default function exit (listener) {
  let { exit, sigint, sigterm } = (typeof listener === 'object') ? listener : { exit: listener, sigint: listener, sigterm: listener }

  process.once('exit', exit)
  process.once('SIGINT', sigint || exit)
  process.once('SIGTERM', sigterm || exit)
}
