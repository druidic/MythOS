/**
 * screen() gets a screen by name, or defines a new screen
 * if given a definition function.
 *
 * The definition function should accept an object argument
 * and set init(), update(), and render() methods on it.
 *
 * It's useful to put helper functions for the screen inside
 * the definition function, so they're scoped to just that
 * screen. Don't put mutable state in there, though, because
 * the definition function is invoked only once per
 * JavaScript runtime. That means mutable state there *will*
 * cause test pollution.
 */
var _screens
function screen(name, definition) {
  if (!_screens) _screens = {}
  if (!definition) return _screens[name]

  _screens[name] = {}
  definition(_screens[name])
}

function goToScreen(name, state, params) {
  state.screen = name
  // the `my` property is used for state that's local to
  // a given screen. It's cleared when switching screens.
  state.my = {}
  _screens[name].init(state, params)
}
