const { readLine } = require('./console')
const show = require('./show')

function processCommand(command) {
  switch (command) {
    case 'exit':
      process.exit(0)
      break
    case 'show':
      show()
      break
    default:
      console.log('wrong command')
      break
  }
}

function app() {
  console.log('Please, write your command!')
  readLine(processCommand)
}

app()

// TODO you can do it!
