const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')
const { escapeRegExp } = require('./helper')

function filterTodos(todos, userName) {
  const escapedUserName = escapeRegExp(userName)
  const userNameRegEx = new RegExp(`^${escapedUserName}`, 'i')

  return todos.filter(todo => userNameRegEx.test(todo.user))
}

function user(userName) {
  const todos = formatTodos(filterTodos(getTodos(), userName))
  printFormattedTodos(todos)
}

module.exports = user
