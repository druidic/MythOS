var customMatchers = {
  toContainGrid: toContainGrid
}

beforeEach(function() {
  jasmine.addMatchers(customMatchers)
})

// --- The Matchers ----------------------------------------

function toContainGrid() {
  return {
    compare: function(actual, expected) {
      var result = {
        pass: isPass(actual, expected)
      }

      if (result.pass) {
        result.message =
          "Saw unexpected output.\n"
          + "  The output was:\n"
          + actual.map(prefix('    ')).join('\n')
          + "  The unexpected text was:\n"
          + expected.map(prefix('    ')).join('\n')
      } else {
        result.message =
          "Did not see expected output.\n"
          + "  The output was:\n"
          + actual.map(prefix('    ')).join('\n')
          + "\n\n  The expected text was:\n"
          + expected.map(prefix('    ')).join('\n')
      }

      return result
    }
  }

  function isPass(actual, expected) {
    var pass = false
    if (expected.length === 0) return true

    if (actual.constructor !== Array || expected.constructor !== Array) {
      throw Error('toContainGrid only compares arrays of strings')
    }

    for (var i = 0; i <= actual.length - expected.length; i++) {
      var foundIndex = actual[i].indexOf(expected[0])
      if (foundIndex === -1) continue

      pass = true

      for (var k = 0; k < expected.length; k++) {
        if (!containsAt(actual[i + k], expected[k], foundIndex)) {
          pass = false
          break
        }
      }
    }

    return pass
  }
}


// --- tests -----------------------------------------------

describe('expect(...).toContainGrid', function() {
  it('finds an empty grid in itself', function() {
    expect([]).toContainGrid([])
  })

  it('finds an empty grid in a nonempty grid', function() {
    expect(['a']).toContainGrid([])
  })

  it('does not find a nonempty grid in an empty grid', function() {
    expect([]).not.toContainGrid([''])
    expect([]).not.toContainGrid(['a'])
  })

  it('finds a nonempty grid in itself', function() {
    expect(['a']).toContainGrid(['a'])
  })

  it('finds a one-element grid in the middle of another', function() {
    expect(['abc','def','ghi']).toContainGrid(['e'])
  })

  it('finds a one-column grid in the middle of another', function() {
    expect(['abc','def','ghi']).toContainGrid(['b','e','h'])
  })

  it('does not find a subgrid when it is not there', function() {
    expect(['abc','def','ghi']).not.toContainGrid(['t'])
    expect(['abc','def','ghi']).not.toContainGrid(['b','e','g'])
  })
})

// --- helper functions ------------------------------------

function containsAt(haystack, needle, start) {
  return needle ===
    haystack.slice(start, start + needle.length)
}
