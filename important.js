const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function important() {
  function filterTodos(todos) {
    return todos.filter(todo => todo.importance > 0)
  }

  const todos = formatTodos(filterTodos(getTodos()))
  printFormattedTodos(todos)
}

module.exports = important
