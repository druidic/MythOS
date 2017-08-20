function App(name, sourceCode) {
  var state = {}
  var running = false
  var errorOutput = null
  var executable = null

  return {
    launch: launch,
    update: update,
    render: render,
    isRunning: isRunning,
    name: name
  }

  function launch() {
    if (running) return

    var exe = getExecutable()
    state = {}

    if (typeof exe.init === 'function') {
      try {
        exe.init(state)
      } catch (e) {
        handleError(e)
      }
    }

    running = true
  }

  function update(event) {
    var exe = getExecutable()

    if (typeof exe.update === 'function') {
      try {
        return exe.update(event, state)
      } catch (e) {
        handleError(e)
      }
    }
  }

  function render() {
    var exe = getExecutable()

    if (errorOutput) {
      return errorOutput
    }

    if (typeof exe.render === 'function') {
      try {
        return [exe.render(state)]
      } catch (e) {
        handleError(e)
        return errorOutput
      }
    }
  }

  function isRunning() {
    return running
  }

  function handleError(error) {
    running = false
    errorOutput = [
      'The app "' + name + '" has crashed.',
      'The error was:',
      '    ' + error,
      '',
      'Please double-tap [shift] to return to the home screen.'
    ]
  }

  function getExecutable() {
    if (executable) return executable

    var appDefinition = new Function('app', sourceCode)
    executable = {}
    appDefinition(executable)
    return executable
  }
}
