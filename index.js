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
  const dateArgumentRegEx = /^(\d{4}|\d{4}-(0[1-9]|1[0-2])|\d{4}-(((0[13578]|1[02])-(0[1-9]|[12]\d|3[0-1]))|(02-(0[1-9]|[12]\d))|((0[469]|11)-(0[1-9]|[12]\d|30))))$/

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
        console.log('invalid argument\nUsage: sort {importance | user | date}')
      }
      break
    }
    case dateCommandRegEx.test(input): {
      const dateString = getArgumentFromConsoleInput(input, 'sort')

      if (!(dateArgumentRegEx.test(dateString))) {
        console.log('invalid date or its format\nExpected: yyyy[-mm-dd]') // e.g.: '2019-03-32' or '2019-30-03' or '2019/03/30'
        return
      }

      date(dateString)
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
