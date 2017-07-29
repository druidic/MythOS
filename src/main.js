var os
function main(event, records) {
  if (event.type === 'startup') os = OS()
  return os.main(event, records)
}
