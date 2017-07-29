describe('booting up', function() {
  it('displays a list of apps that exist', function() {
    var os = OS()
    TestHarness(os)
      .writeFile('dir:apps', 'app1\napp2')
      .start()
      .onScreen(expect, [
        'app1',
        'app2'
      ])
  })

  it('displays titles', function() {
    var os = OS()
    TestHarness(os)
      .writeFile('dir:apps', 'app1\napp2')
      .start()
      .onScreen(expect, ['GroveOS'])
      .onScreen(expect, ['Applications:'])
      .onScreen(expect, ['Help:'])
      .onScreen(expect, ['Press [Shift+?] for help.'])
  })
})
