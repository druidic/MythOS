describe('When an app is running', function() {
  var withRunningApp
  beforeEach(function() {
    withRunningApp = TestHarness(OS())
      .writeFile('dir:apps', 'hello')
      .writeFile('app:hello',
          'app.render = function() { return "greetings"}')
      .start()
      .input('\n')
      .onScreen(expect, ['greetings'])
  })

  it('goes back to the task manager when you double-tap shift', function() {
    withRunningApp
      .pressKey(16)
      .releaseKey(16)
      .pressKey(16)
      .releaseKey(16)

      .onScreen(expect, ['Applications:'])
  })

  it('cancels the double-tap when you press a non-shift key', function() {
    withRunningApp
      .pressKey(16)
      .releaseKey(16)
      .pressKey(16)
      .pressKey(32)
      .releaseKey(16)

      .onScreen(expect, ['greetings'])
  })

  it('lets you take a bit of time to double-tap', function() {
    withRunningApp
      .pressKey(16)
      .releaseKey(16)
      .wait(1)
      .pressKey(16)
      .releaseKey(16)

      .onScreen(expect, ['Applications:'])
  })

  it('cancels the double-tap if you wait too long', function() {
    withRunningApp
      .pressKey(16)
      .releaseKey(16)
      .wait(40)
      .pressKey(16)
      .releaseKey(16)

      .onScreen(expect, ['greetings'])
  })
})
