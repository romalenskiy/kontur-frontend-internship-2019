const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function filterTodos(todos, dateInMS) {
  return todos.filter((todo) => {
    const todoDateInMS = Date.parse(todo.date)

    return Number.isNaN(todoDateInMS) ? false : todoDateInMS >= dateInMS
  })
}

function date(dateInMS) {
  const todos = formatTodos(filterTodos(getTodos(), dateInMS))
  printFormattedTodos(todos)
}

module.exports = date
