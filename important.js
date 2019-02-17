const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function filterTodos(todos) {
  return todos.filter(todo => todo.importance > 0)
}

function important() {
  const todos = formatTodos(filterTodos(getTodos()))
  printFormattedTodos(todos)
}

module.exports = important
