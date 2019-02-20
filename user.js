const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')
const { escapeRegExp } = require('./helper')

function user(userName) {
  function filterTodos(todos) {
    const escapedUserName = escapeRegExp(userName)
    const userNameRegEx = new RegExp(`^${escapedUserName}`, 'i')

    return todos.filter(todo => userNameRegEx.test(todo.user))
  }

  const todos = formatTodos(filterTodos(getTodos()))
  printFormattedTodos(todos)
}

module.exports = user
