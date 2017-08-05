describe('When an app is running', function() {
  it('forwards events to the update() function', function() {
    var code =
    [
      'app.init = function($) {',
      '  $.count = 0',
      '}',
      'app.update = function(event, $) {',
      '  $.count++',
      '}',
      'app.render = function($) {',
      '  return "" + $.count',
      '}'
    ].join('\n')

    TestHarness(OS())
      .writeFile('dir:apps', 'test')
      .writeFile('app:test', code)
      .start()
      .input('\n')
      .input('asdf')
      .onScreen(expect, ['8'])
  })
})
