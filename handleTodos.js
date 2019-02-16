const { getFiles } = require('./fileSystem')

function collectTodos() {
  const files = getFiles()
  const todos = []

  files.forEach((file) => {
    let { fileString } = file
    const { fileName } = file
    let indexOfTodoStart = fileString.search(/\/\/ todo/i)
    let indexOfTodoEnd
    let todo
    let indexOfCommentStart
    let comment

    while (indexOfTodoStart !== -1) {
      indexOfTodoEnd = fileString.indexOf('\n', indexOfTodoStart)
      if (indexOfTodoEnd === -1) indexOfTodoEnd = fileString.length

      todo = fileString.slice(indexOfTodoStart + 7, indexOfTodoEnd).trim()
      indexOfCommentStart = todo.search(/[^ :]/)
      comment = todo.slice(indexOfCommentStart, indexOfTodoEnd)

      todos.push({ comment, fileName })

      fileString = fileString.slice(indexOfTodoEnd)
      indexOfTodoStart = fileString.search(/\/\/ todo/i)
    }
  })

  return todos
}

function defineTodoImportance(comment) {
  let importance = 0
  let message = comment

  while (message.includes('!')) {
    importance += 1
    message = message.slice(message.indexOf('!') + 1)
  }

  return importance
}

function parseTodos(todos) {
  return todos.map((todo) => {
    let { comment } = todo
    const { fileName } = todo
    let user = ''
    let date = ''

    if (comment.includes(';')) {
      const messageAsArray = []

      while (comment.includes(';')) {
        if (comment[0] === ';') {
          messageAsArray.push('')
        } else {
          const indexOfSeparator = comment.indexOf(';')
          messageAsArray.push(comment.slice(0, indexOfSeparator))
        }

        comment = comment.slice(comment.indexOf(';') + 1).trim()
      }

      const importance = defineTodoImportance(comment)
      user = messageAsArray[0] // eslint-disable-line prefer-destructuring
      date = messageAsArray[1] // eslint-disable-line prefer-destructuring

      return { importance, user, date, comment, fileName }
    }
    const importance = defineTodoImportance(comment)

    return { importance, user, date, comment, fileName }
  })
}

function getTodos() {
  return parseTodos(collectTodos())
}

function findColumnsWidth(todos) {
  let userWidth = 4
  let dateWidth = 4
  let commentWidth = 7
  let fileNameWidth = 8

  todos.forEach((todo) => {
    const { user, date, comment, fileName } = todo

    if (user.length > userWidth) {
      userWidth = user.length
      if (userWidth > 10) {
        userWidth = 10
      }
    }

    if (date.length > dateWidth) {
      dateWidth = date.length
      if (dateWidth > 10) {
        dateWidth = 10
      }
    }

    if (comment.length > commentWidth) {
      commentWidth = comment.length
      if (commentWidth > 50) {
        commentWidth = 50
      }
    }

    if (fileName.length > fileNameWidth) {
      fileNameWidth = fileName.length
      if (fileNameWidth > 15) {
        fileNameWidth = 15
      }
    }
  })

  return { userWidth, dateWidth, commentWidth, fileNameWidth }
}

function formatCell(cell, width, maxWidth) {
  return cell.length <= width ? `${cell}${' '.repeat(width - cell.length)}` : `${cell.slice(0, maxWidth - 3)}...`
}

function formatTodos(todos) {
  const { userWidth, dateWidth, commentWidth, fileNameWidth } = findColumnsWidth(todos)

  const todoRows = todos.map((todo) => {
    const importance = todo.importance ? '!' : ' '
    const user = formatCell(todo.user, userWidth, 10)
    const date = formatCell(todo.date, dateWidth, 10)
    const comment = formatCell(todo.comment, commentWidth, 50)
    const fileName = formatCell(todo.fileName, fileNameWidth, 15)

    return `  ${importance}  |  ${user}  |  ${date}  |  ${comment}  |  ${fileName}  `
  })

  const userHeadingCell = formatCell('user', userWidth, 10)
  const dateHeadingCell = formatCell('date', dateWidth, 10)
  const commentHeadingCell = formatCell('comment', commentWidth, 50)
  const fileNameHeadingCell = formatCell('fileName', fileNameWidth, 15)

  const headingRow = `  !  |  ${userHeadingCell}  |  ${dateHeadingCell}  |  ${commentHeadingCell}  |  ${fileNameHeadingCell}  `
  const separatorRow = '-'.repeat(headingRow.length)

  todoRows.unshift(headingRow, separatorRow)
  if (todoRows.length >= 3) { todoRows.push(separatorRow) }

  return todoRows
}

function printFormattedTodos(todos) {
  console.log(todos.join('\n'))
}

module.exports = {
  collectTodos,
  parseTodos,
  getTodos,
  formatTodos,
  printFormattedTodos,
}
