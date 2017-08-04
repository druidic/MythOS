function OS() {
  var state = {
    records: null,
    my: null
  }

  goToScreen('taskManager', state)

  return {
    main: main
  }

  function main(event, records) {
    state.records = records
    screen(state.screen).update(event, state)
    return screen(state.screen).render(state)
  }
}
