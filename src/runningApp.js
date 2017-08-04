screen('runningApp', function(scrn) {
  scrn.init = function($, params) {
    $.my.appName = params.app
  }
  scrn.update = function() {}
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
})
