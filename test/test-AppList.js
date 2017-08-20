describe('AppList', function() {
  it('initially contains no apps', function() {
    var appList = AppList()
    expect(appList.map(getName)).toEqual([])
    expect(appList.count()).toBe(0)
  })

  it('can have apps added to it', function() {
    var appList = AppList()
    appList.add({name: 'foo'})
    expect(appList.map(getName)).toEqual(['foo'])
    expect(appList.count()).toBe(1)
  })

  it('sorts added apps by name', function() {
    var appList = AppList()
    appList.add({name: 'abc'})
    appList.add({name: 'ghi'})
    appList.add({name: 'def'})
    appList.add({name: 'aaa'})
    expect(appList.map(getName)).toEqual(
      ['aaa', 'abc', 'def', 'ghi'])
  })

  it('never contains multiple apps with the same name', function() {
    var appList = AppList()
    appList.add({name: 'foo'})
    appList.add({name: 'foo'})
    expect(appList.map(getName)).toEqual(['foo'])
  })

  function getName(app) {
    return app.name
  }
})
