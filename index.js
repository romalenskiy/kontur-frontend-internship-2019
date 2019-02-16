const { readLine } = require('./console')
const show = require('./show')
const important = require('./important')
const user = require('./user')

function processCommand(command) {
  const userCommandRegEx = /user [^\s]/

  switch (true) {
    case command === 'exit': {
      process.exit(0)
      break
    }
    case command === 'show': {
      show()
      break
    }
    case command === 'important': {
      important()
      break
    }
    case userCommandRegEx.test(command): {
      const userName = command.slice(command.indexOf(' ') + 1).trim()
      user(userName)
      break
    }
    default: {
      console.log('wrong command')
      break
    }
  }
}

function app() {
  console.log('Please, write your command!')
  readLine(processCommand)
}

app()

// TODO you can do it!
