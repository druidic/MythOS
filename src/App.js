function App(name, eventHandlers) {
  var state = {}
  var running = false
  var errorOutput

  init(state)

  return {
    update: update,
    render: render,
    isRunning: isRunning
  }

  function init() {
    if (typeof eventHandlers.init === 'function') {
      try {
        eventHandlers.init(state)
      } catch (e) {
        handleError(e)
      }
    }
    running = true
  }

  function update(event) {
    if (typeof eventHandlers.update === 'function') {
      try {
        return eventHandlers.update(event, state)
      } catch (e) {
        handleError(e)
      }
    }
  }

  function render() {
    if (errorOutput) {
      return errorOutput
    }

    if (typeof eventHandlers.render === 'function') {
      try {
        return [eventHandlers.render(state)]
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
}
