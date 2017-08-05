function TestHarness(app) {
  var started = false
  var records = {}
  var screen = ''
  var self

  return self = {
    start: start,
    input: input,
    pressKey: pressKey,
    releaseKey: releaseKey,
    wait: wait,
    getScreen: getScreen,
    writeFile: writeFile,
    onScreen: onScreen
  }

  function start() {
    callMain({type: 'startup'})
    started = true
    return self
  }

  function input(text) {
    if (!started) start()

    for (var i = 0; i < text.length; i++) {
      typeChar(text.charAt(i))
    }

    return self
  }

  function pressKey(code) {
    if (!started) start()

    callMain({type: 'keyDown', key: code})
    return self
  }

  function releaseKey(code) {
    if (!started) start()

    callMain({type: 'keyUp', key: code})
    return self
  }

  function wait(frames) {
    if (!started) start()

    for (var i = 0; i < frames; i++) {
      callMain({type: 'clock'})
    }

    return self
  }

  function typeChar(c) {
    if (needsShift(c)) {
      callMain({type: 'keyDown', key: 16})
      callMain({type: 'keyDown', key: keyCode(c)})
      callMain({type: 'keyUp',   key: keyCode(c)})
      callMain({type: 'keyUp',   key: 16})
    } else {
      callMain({type: 'keyDown', key: keyCode(c)})
      callMain({type: 'keyUp',   key: keyCode(c)})
    }

    return self
  }

  function callMain(event) {
    result = app.main.call(null, event, ReadOnly(records))
    if (result) {
      screen = (result.screen || result).slice(0, 32)
    }
  }

  function getScreen() {
    return screen
  }

  function writeFile(key, val) {
    records[key] = val
    return self
  }

  function onScreen(expect, lines) {
    expect(screen).toContainGrid(lines)
    return self
  }
}

function ReadOnly(records) {
  return {
    read: read
  }

  function read(key) {
    return records[key] || ''
  }
}

function keyCode(c) {
  for (var code in CHARS_BY_CODE) {
    if (CHARS_BY_CODE.hasOwnProperty(code)) {
      if (   c === CHARS_BY_CODE[code][0]
          || c === CHARS_BY_CODE[code][1]) {

        return code
      }
    }
  }
}

function needsShift(c) {
  for (var code in CHARS_BY_CODE) {
    if (CHARS_BY_CODE.hasOwnProperty(code)) {
      if (c === CHARS_BY_CODE[code][0]) {
        return false
      }
      if (c === CHARS_BY_CODE[code][1]) {
        return true
      }
    }
  }
  return false
}
