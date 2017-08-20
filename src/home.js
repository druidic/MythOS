screen('home', function(scrn) {
  var ENTER = 13

  scrn.init = function($) {
    $.my.cursor = 0
    if (!$.apps) {
      $.apps = AppList()
    }

    listInstalledApps($).forEach(function(appName) {
      var code = $.records.read('app:' + appName)
      $.apps.add(App(appName, code))
    })
  }

  scrn.render = function($) {
    var cursor = $.my.cursor

    return {
      screen: [
        center(64)('Home Screen'),
        '',
        'Applications:',
        ''
      ]
      .concat(renderAppList($.apps, cursor))
    }
  }

  scrn.update = function(event, $) {
    var apps = listInstalledApps($)
    var appCount = $.apps.count()

    if (event.type === 'keyDown') {
      switch (char(event.key)) {
        case 'j':
          $.my.cursor++
          if ($.my.cursor >= appCount) {
            $.my.cursor = appCount - 1
          }
          break
        case 'k':
          $.my.cursor--
          if ($.my.cursor < 0) {
            $.my.cursor = 0
          }
          break
      }
    }

    if (event.type === 'keyUp' && event.key === ENTER) {
      // launchApp($, apps[$.my.cursor])
      var app = $.apps.at($.my.cursor)
      app.launch()
      goToScreen('runningApp', $, {app: app})
    }
  }

  function renderAppList(apps, cursor) {
    if (apps.count() === 0) {
      return '    There are no installed applications.'
    }
    return apps
      .map(getName)
      .map(at(cursor,
        prefix('  █ '),
        prefix('    ')))
  }

  function listInstalledApps($) {
    var dir = $.records.read('dir:apps')
    return dir ? dir.split('\n') : []
  }

  function getName(app) {
    return app.name
  }
})
