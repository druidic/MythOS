describe('center', function() {
  it('returns the string when width is less than the string length', function() {
    expect(center(0)('hello')).toBe('hello')
  })

  it('adds whitespace to center the string', function() {
    expect(center(7)('hello')).toBe(' hello')
    expect(center(9)('hello')).toBe('  hello')
    expect(center(9)('foo')).toBe('   foo')
  })

  it('biases toward the left', function() {
    expect(center(8)('hello')).toBe(' hello')
  })
})

describe('wrap', function() {
  it('wraps one string in another', function() {
    expect(wrap('^')('_')).toBe('^_^')
  })
})

describe('snug', function() {
  it('pads a string with spaces on the right, then truncates to 64 chars', function() {
    expect(snug('')).toBe(
      '                                ' +
      '                                '
    )
    expect(snug('').length).toBe(64)

    expect(snug('foo')).toBe(
      'foo                             ' +
      '                                '
    )
    expect(snug('foo').length).toBe(64)
  })
})
