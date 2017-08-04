function prefix(pre) {
  return function(s) {
    return pre + s
  }
}

function center(width) {
  SPACES = "                                "
  // TODO test
  return function(s) {
    if (width < s.length) return s
    return SPACES.slice(0, (width - s.length) / 2) + s
  }
}

function wrap(circumfix) {
  return function(s) {
    return circumfix + s + circumfix
  }
}

function snug(s) {
  _64_spaces =
    '                                ' +
    '                                '

  return (s + _64_spaces).slice(0, 64)
}
