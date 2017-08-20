function AppList() {
  var apps = []

  return {
    at: at,
    count: count,
    add: add,
    forEach: apps.forEach.bind(apps),
    map: apps.map.bind(apps)
  }

  function at(index) {
    return apps[index]
  }

  function count() {
    return apps.length
  }

  function add(toAdd) {
    for (var i = 0; i < apps.length; i++) {
      if (apps[i].name < toAdd.name) continue
      if (apps[i].name >= toAdd.name) break
    }

    if (i < apps.length && apps[i].name == toAdd.name) {
      return
    }

    apps.splice(i, 0, toAdd)
  }
}
