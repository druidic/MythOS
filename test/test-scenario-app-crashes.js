describe('When an app crashes in render()', function() {
  it('displays an error screen', function() {
    var code = [
      'app.render = function() {',
      '  throw "oops"',
      '}'
    ].join('\n')

    TestHarness(OS())
      .writeFile('dir:apps', 'test')
      .writeFile('app:test', code)
      .start()
      .input('\n')
      .onScreen(expect, [
        'The app "test" has crashed.',
        'The error was:',
        '    oops',
        '',
        'Please double-tap [shift] to return to the home screen.'
      ])
  })
})

describe('When an app crashes in update()', function() {
  it('displays an error screen', function() {
    var code = [
      'app.render = function() {',
      '  return "okay"',
      '}',
      'app.update = function() {',
      '  throw "kablooie"',
      '}'
    ].join('\n')

    TestHarness(OS())
      .writeFile('dir:apps', 'test')
      .writeFile('app:test', code)
      .start()
      .input('\n')
      .wait(1)
      .onScreen(expect, [
        'The app "test" has crashed.',
        'The error was:',
        '    kablooie',
        '',
        'Please double-tap [shift] to return to the home screen.'
      ])
  })
})
