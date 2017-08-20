describe('live-updating app code', function() {
  function doubleTapShift(testHarness) {
    testHarness
      .pressKey(16)
      .releaseKey(16)
      .pressKey(16)
      .releaseKey(16)
  }

  it('changes app logic', function() {
    TestHarness(OS())
      .writeFile('dir:apps', 'test')
      .writeFile('app:test', 'app.render = function() { return "original" }')
      .start()

      // home screen
      .onScreen(expect, ["█ test"])

      // launch the app with the original code
      .input('\n')
      .onScreen(expect, ["original"])

      // go back to the home screen
      .and(doubleTapShift)
      .onScreen(expect, ["█ test"])

      // change the app code and hot-swap
      .writeFile('app:test', 'app.render = function() { return "changed" }')
      .input('u\n') // for "update"
      .onScreen(expect, ["changed"])
  })

  it('does not change app state', function() {
    var appLines = [
      'app.init = function($) {',
      '  $.count = 0',
      '}',
      'app.update = function(event, $) {',
      '  if (event.type === "keyDown" && event.key !== 16) $.count++',
      '}',
      'app.render = function($) {',
      '  return "original: " + $.count',
      '}'
    ]

    TestHarness(OS())
      .writeFile('dir:apps', 'test')
      .writeFile('app:test', appLines.join('\n'))
      .start()

      // launch the original app and update the state a few times
      .input('\n')
      .input('1234')
      .onScreen(expect, ['original: 4'])

      // change the code
      .and(doubleTapShift)
      .and(function(testHarness) {
        appLines[7] = 'return "updated: " + $.count'
        testHarness.writeFile('app:test', appLines.join('\n'))
      })

      // live-update and observe the state is the same
      .input('u\n')
      .onScreen(expect, ['updated: 4'])
  })
})
