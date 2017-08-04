describe('at', function() {
  it('transforms the elements of an array, special-casing a given index', function() {
    function times(x) {
      return function(y) {
        return x * y
      }
    }

    function plus(x) {
      return function(y) {
        return x + y
      }
    }

    var result = [1, 2, 3].map(at(1, times(1000), plus(1)))
    expect(result).toEqual([2, 2000, 4])
  })
})
