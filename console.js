const readline = require('readline')

// TODO ; 2018-10-01; Можно ли написать более лаконично?
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

function readLine(callback) {
  rl.on('line', callback) // TODO pe; 2015-08-10; а какая будет кодировка?
}

// TODO digi; 2016-04-08; добавить writeLine!!!

function getArgumentFromConsoleInput(input, command) {
  return input.slice(command.length).trim()
}

function HandleConsoleInput(
  input,
  commandName,
  callback,
  argumentName = '',
  fallback = () => { console.log(`expected argument ${argumentName === '' ? '' : `{${argumentName}}`}`) },
  defaultFallback = () => { console.log('wrong command') },
) {
  const CommandWithArgumentRegEx = new RegExp(`^${commandName}[ \\t]+[^\\s]`)
  const CommandWithoutArgumentRegEx = new RegExp(`^${commandName}$`)

  if (CommandWithArgumentRegEx.test(input)) {
    callback(getArgumentFromConsoleInput(input, commandName))
  } else if (CommandWithoutArgumentRegEx.test(input)) {
    fallback()
  } else {
    defaultFallback()
  }
}

module.exports = {
  readLine,
  HandleConsoleInput,
}
