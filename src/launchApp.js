function launchApp($, appName) {
  var code = $.records.read('app:' + appName)
  var appDefinition = new Function('app', code)
  var app = {}
  appDefinition(app)
  app.name = appName
  app.state = {}

  if (app.init) {
    app.init(app.state)
  }

  goToScreen('runningApp', $, {app: app})
}
