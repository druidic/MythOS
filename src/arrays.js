function at(theIndex, transformTheOne, transformOthers) {
  return function(item, index) {
    if (index === theIndex) {
      return transformTheOne(item)
    } else {
      return transformOthers(item)
    }
  }
}
