describe('booting up', function() {
  it('displays a list of installed apps', function() {
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
  })

  it('displays a message if no apps are installed', function() {
    var os = OS()
    TestHarness(os)
      .start()
      .onScreen(expect, [
        'Applications:',
        '             ',
        '    There are no installed applications.'
      ])
  })
})
