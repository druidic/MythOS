describe('The app launch screen', function() {
  it('lets you choose an app with j/k', function() {
    var os = OS()
    TestHarness(os)
      .writeFile('dir:apps', 'app1\napp2')
      .start()
      .onScreen(expect, [
        'Applications:',
        '             ',
        '  █ app1     ',
        '    app2     '
      ])
      .input('j')
      .onScreen(expect, [
        'Applications:',
        '             ',
        '    app1     ',
        '  █ app2     '
      ])
      .input('k')
      .onScreen(expect, [
        'Applications:',
        '             ',
        '  █ app1     ',
        '    app2     '
      ])
  })

  it('does not let you scroll beyond the bottom of the list', function() {
    var os = OS()
    TestHarness(os)
      .writeFile('dir:apps', 'app1\napp2')
      .start()
      .onScreen(expect, [
        'Applications:',
        '             ',
        '  █ app1     ',
        '    app2     '
      ])
      .input('jj')
      .onScreen(expect, [
        'Applications:',
        '             ',
        '    app1     ',
        '  █ app2     '
      ])
  })

  it('does not let you scroll beyond the top of the list', function() {
    var os = OS()
    TestHarness(os)
      .writeFile('dir:apps', 'app1\napp2')
      .start()
      .onScreen(expect, [
        'Applications:',
        '             ',
        '  █ app1     ',
        '    app2     '
      ])
      .input('k')
      .onScreen(expect, [
        'Applications:',
        '             ',
        '  █ app1     ',
        '    app2     '
      ])
  })

  it('launches an app when you press enter', function() {
    var appCode = [
      'app.render = function() {',
      '  return "greetings"',
      '}'
    ].join('\n')
    TestHarness(OS())
      .writeFile('dir:apps', 'hello')
      .writeFile('app:hello', appCode)
      .start()
      .input('\n')
      .onScreen(expect, ['greetings'])
  })
})
