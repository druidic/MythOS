function OS() {
  var state = {
    records: null,
    my: null,
    apps: null,
    screen: null
  }

  return {
    main: main
  }

  function main(event, records) {
    state.records = records
    if (!state.screen) {
      goToScreen('home', state)
    }
    screen(state.screen).update(event, state)
    return screen(state.screen).render(state)
  }
}
