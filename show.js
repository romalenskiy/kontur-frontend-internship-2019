const { collectTodos, parseTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function show() {
  const todos = formatTodos(parseTodos(collectTodos()))
  printFormattedTodos(todos)
}

module.exports = show
