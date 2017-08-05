screen('taskManager', function(scrn) {
  scrn.init = function($) {
    $.my.cursor = 0
  }

  scrn.render = function($) {
    var cursor = $.my.cursor

    return {
      screen: [
        center(64)('MythOS Task Manager'),
        '',
        'Applications:',
        ''
      ]
      .concat(renderAppList(listInstalledApps($), cursor))
    }
  }

  scrn.update = function(event, $) {
    var apps = listInstalledApps($)

    if (event.type === 'keyDown') {
      switch (char(event.key)) {
        case 'j':
          $.my.cursor++
          if ($.my.cursor >= apps.length) {
            $.my.cursor = apps.length - 1
          }
          break
        case 'k':
          $.my.cursor--
          if ($.my.cursor < 0) {
            $.my.cursor = 0
          }
          break
        case '\n':
          goToScreen('runningApp', $, {
            app: apps[$.my.cursor]
          })
          break
      }
    }
  }

  function renderAppList(apps, cursor) {
    if (apps.length === 0) {
      return '    There are no installed applications.'
    }
    return apps.map(at(cursor,
      prefix('  █ '),
      prefix('    ')))
  }

  function listInstalledApps($) {
    var dir = $.records.read('dir:apps')
    return dir ? dir.split('\n') : []
  }
})
