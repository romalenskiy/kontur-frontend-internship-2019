const { readLine } = require('./console')
const show = require('./show')
const important = require('./important')
const user = require('./user')
const sort = require('./sort')
const date = require('./date')

function processCommand(command) {
  const userCommandRegEx = /^user [^\s]/
  const sortCommandRegEx = /^sort (importance|user|date)$/
  const dateCommandRegEx = /^date [^\s]/

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
    case sortCommandRegEx.test(command): {
      const columnName = command.slice(command.indexOf(' ') + 1)
      sort(columnName)
      break
    }
    case dateCommandRegEx.test(command): {
      const dateString = command.slice(command.indexOf(' ') + 1)
      const inputParsedDate = Date.parse(dateString)

      if (Number.isNaN(inputParsedDate)) {
        console.log('invalid date')
      } else {
        date(inputParsedDate)
      }
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
