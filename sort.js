const { getTodos, formatTodos, printFormattedTodos } = require('./handleTodos')

function sortByImportance(todos) {
  return todos.sort((firstTodo, secondTodo) => secondTodo.importance - firstTodo.importance)
}

function sortByUser(todos) {
  const unnamedTodos = []
  const namedTodos = []

  todos.forEach((todo) => {
    if (todo.user === '') {
      unnamedTodos.push(todo)
    } else {
      namedTodos.push(todo)
    }
  })

  const sortedNamedTodos = namedTodos.sort((firstTodo, secondTodo) => {
    const firstTodoUser = firstTodo.user.toUpperCase()
    const secondTodoUser = secondTodo.user.toUpperCase()

    if (firstTodoUser === secondTodoUser) return 0
    return firstTodoUser < secondTodoUser ? -1 : 1
  })

  return [...sortedNamedTodos, ...unnamedTodos]
}

function sortByDate(todos) {
  const undatedTodos = []
  const datedTodos = []

  todos.forEach((todo) => {
    if (todo.date === '') {
      undatedTodos.push(todo)
    } else {
      datedTodos.push(todo)
    }
  })

  const sortedDatedTodos = datedTodos.sort((firstTodo, secondTodo) => {
    const firstTodoDate = Date.parse(firstTodo.date)
    const secondTodoDate = Date.parse(secondTodo.date)

    return secondTodoDate - firstTodoDate
  })

  return [...sortedDatedTodos, ...undatedTodos]
}

const sortBy = {
  importance: sortByImportance,
  user: sortByUser,
  date: sortByDate,
}

function sort(columnName) {
  const todos = formatTodos(sortBy[columnName](getTodos()))
  printFormattedTodos(todos)
}

module.exports = sort
