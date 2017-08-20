describe('an App', function() {
  it('initializes its state only once', function() {
    var code = [
      'app.init = function($) {',
      '  $.n = 0',
      '}',

      'app.update = function(event, $) {',
      '  if (event.key) $.n++',
      '}',

      'app.render = function($) {',
      '  return "pressed: " + $.n',
      '}'
    ].join('\n')

    var app = App('test', code)
    app.launch()
    app.update({key: 1})
    expect(app.render()).toEqual(['pressed: 1'])
    app.launch()
    expect(app.render()).toEqual(['pressed: 1'])
  })
})
