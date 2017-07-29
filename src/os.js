function OS() {
  return {
    main: main
  }

  function main(event, records) {
    var apps = records.read('dir:apps').split('\n')

    return {
      screen: [
        center(64)('GroveOS'),
        '',
        'Applications:',
        ''
      ]
      .concat(apps.map(prefix('    ')))
      .concat([
        '',
        'Help:',
        '',
        '    Press [Shift+?] for help.'
      ])
    }
  }
}
