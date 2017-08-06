screen('runningApp', function(scrn) {
  var SHIFT = 16

  scrn.init = function($, params) {
    $.my.app = params.app
    $.my.shiftEvents = 0
    $.my.framesSinceLastShift = 0
  }

  scrn.update = function(event, $) {
    if (isKeyEvent(event)) {
      if (event.key === SHIFT) {
        $.my.shiftEvents++
        $.my.framesSinceLastShift = 0
      } else {
        $.my.shiftEvents = 0
      }
    }

    if (event.type === 'clock') {
      $.my.framesSinceLastShift++
      if ($.my.framesSinceLastShift > 20) {
        $.my.shiftEvents = 0
      }
    }

    if ($.my.app.update) {
      try {
        $.my.app.update(event, $.my.app.state)
      } catch (e) {
        setErrorMessage($, e)
      }
    }

    if ($.my.shiftEvents === 4) {
      goToScreen('taskManager', $)
    }
  }

  scrn.render = function($) {
    if ($.my.error) {
      return {screen: $.my.error}
    }

    var output
    try {
      output = [$.my.app.render($.my.app.state)]
    } catch (e) {
      setErrorMessage($, e)
      return {screen: $.my.error}
    }
    return {
      screen: output
    }
  }

  function loadApp(records, name) {
    var code = records.read('app:' + name)
    var f = new Function('app', code)
    var app = {}
    f(app)
    return app
  }

  function isKeyEvent(event) {
    return event.key
  }

  function setErrorMessage($, error) {
    $.my.error = [
      'The app "' + $.my.app.name + '" has crashed.',
      'The error was:',
      '    ' + error,
      '',
      'Please double-tap [shift] to return to the home screen.'
    ]
  }
})
