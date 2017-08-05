screen('runningApp', function(scrn) {
  var SHIFT = 16

  scrn.init = function($, params) {
    $.my.appName = params.app
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

    if ($.my.shiftEvents === 4) {
      goToScreen('taskManager', $)
    }
  }

  scrn.render = function($) {
    var app = loadApp($.records, $.my.appName)
    return {
      screen: [app.render()]
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
})
