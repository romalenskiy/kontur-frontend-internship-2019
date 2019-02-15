const { collectTodos, parseTodos, formatTodos } = require('./handleTodos')

function show() {
  const todos = formatTodos(parseTodos(collectTodos()))
  console.log(todos.join('\n'))
}

module.exports = show
