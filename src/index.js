const { readLine, HandleConsoleInput } = require('./console')
const show = require('./show')
const important = require('./important')
const user = require('./user')
const sort = require('./sort')
const date = require('./date')

function processCommand(command) {
  const input = command.trim()

  const userCommandRegEx = /^user/

  const sortCommandRegEx = /^sort/
  const sortArgumentRegEx = /^(importance|user|date)$/

  const dateCommandRegEx = /^date/
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
      HandleConsoleInput(
        input,
        'user',
        (userName) => { user(userName) },
        'username',
      )
      break
    }
    case sortCommandRegEx.test(input): {
      HandleConsoleInput(
        input,
        'sort',
        (columnName) => {
          if (sortArgumentRegEx.test(columnName)) {
            sort(columnName)
          } else {
            console.log('invalid argument\navailable arguments: {importance | user | date}')
          }
        },
        'importance | user | date',
      )
      break
    }
    case dateCommandRegEx.test(input): {
      HandleConsoleInput(
        input,
        'date',
        (dateString) => {
          if (dateArgumentRegEx.test(dateString)) {
            date(dateString)
          } else {
            console.log('invalid date or its format\nexpected: yyyy[-mm-dd]') // e.g.: '2019-03-32' or '2019-30-03' or '2019/03/30'
          }
        },
        'yyyy[-mm-dd]',
      )
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
