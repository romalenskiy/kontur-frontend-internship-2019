const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function filterTodos(todos, inputParsedDate) {
  return todos.filter((todo) => {
    const todoParsedDate = Date.parse(todo.date)

    return Number.isNaN(todoParsedDate) ? false : todoParsedDate >= inputParsedDate
  })
}

function date(inputParsedDate) {
  const todos = formatTodos(filterTodos(getTodos(), inputParsedDate))
  printFormattedTodos(todos)
}

module.exports = date
