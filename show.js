const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function show() {
  const todos = formatTodos(getTodos())
  printFormattedTodos(todos)
}

module.exports = show
