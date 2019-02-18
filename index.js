const { readLine, getArgumentFromConsoleInput } = require('./console')
const show = require('./show')
const important = require('./important')
const user = require('./user')
const sort = require('./sort')
const date = require('./date')

function processCommand(command) {
  const input = command.trim()

  const userCommandRegEx = /^user[ \t]+[^\s]/
  const sortCommandRegEx = /^sort[ \t]+[^\s]/
  const sortArgumentRegEx = /^(importance|user|date)$/
  const dateCommandRegEx = /^date[ \t]+[^\s]/

  switch (true) {
    case input === 'exit': {
      process.exit(0)
      break
    }
    case input === 'show': {
      show()
      break
    }
    case input === 'important': {
      important()
      break
    }
    case userCommandRegEx.test(input): {
      const userName = getArgumentFromConsoleInput(input, 'user')

      user(userName)
      break
    }
    case sortCommandRegEx.test(input): {
      const columnName = getArgumentFromConsoleInput(input, 'sort')

      if (sortArgumentRegEx.test(columnName)) {
        sort(columnName)
      } else {
        console.log('invalid argument')
      }
      break
    }
    case dateCommandRegEx.test(input): {
      const dateString = getArgumentFromConsoleInput(input, 'sort')
      const inputParsedDate = Date.parse(dateString)

      if (Number.isNaN(inputParsedDate)) {
        console.log('invalid argument')
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
