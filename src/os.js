function OS() {
  var state = {
    installedApps: [],
    cursor: 0
  }

  return {
    main: main
  }

  function main(event, records) {
    update(event, records, state)
    return render(state)
  }

  function update(event, records, $) {
    if (event.type === 'startup') {
      $.installedApps = listInstalledApps(records)
      return
    }
    if (event.type === 'keyDown') {
      switch (char(event.key)) {
        case 'j':
          $.cursor++
          if ($.cursor >= $.installedApps.length) {
            $.cursor = $.installedApps.length - 1
          }
          break
        case 'k':
          $.cursor--
          if ($.cursor < 0) {
            $.cursor = 0
          }
          break
      }
    }
  }

  function render($) {
    return {
      screen: [
        center(64)('GroveOS'),
        '',
        'Applications:',
        ''
      ]
      .concat(renderAppList($.installedApps, $.cursor))
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

  function listInstalledApps(records) {
    var dir = records.read('dir:apps')
    return dir ? dir.split('\n') : []
  }
}
