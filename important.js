const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function filterTodos(todos) {
  return todos.filter(todo => todo.importance > 0)
}

function important() {
  const importantTodos = formatTodos(filterTodos(getTodos()))
  printFormattedTodos(importantTodos)
}

module.exports = important
