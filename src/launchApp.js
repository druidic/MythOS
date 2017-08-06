function launchApp($, appName) {
  var code = $.records.read('app:' + appName)
  var appDefinition = new Function('app', code)
  var eventHandlers = {}
  appDefinition(eventHandlers)
  var app = App(appName, eventHandlers)

  goToScreen('runningApp', $, {app: app})
}
