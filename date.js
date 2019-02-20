const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function filterTodos(todos, inputDate) {
  return todos.filter((todo) => {
    const todoParsedDate = Date.parse(todo.date)
    const inputParsedDate = Date.parse(inputDate)

    // Can't just use (todoParseDate >= inputParseDate), because Date.parse('yyyy') will be the same as Date.parse('yyyy-01')
    return ((todo.date === inputDate) || (todoParsedDate > inputParsedDate))
  })
}

function date(inputDate) {
  const todos = formatTodos(filterTodos(getTodos(), inputDate))
  printFormattedTodos(todos)
}

module.exports = date
