const { getFiles } = require('./fileSystem')

function collectTodos() {
  const files = getFiles()
  const todos = []

  files.forEach((file) => {
    const todoStartRegEx = /\/\/[ \t]*todo/i
    let { fileString } = file
    const { fileName } = file
    let indexOfTodoStart = fileString.search(todoStartRegEx)
    let indexOfTodoEnd

    // For clarity understanding:
    // todо string is smthing like that - "// TODО: foo; bar; baz"
    // todо body then is like that - "foo; bar; baz"
    while (indexOfTodoStart !== -1) {
      indexOfTodoEnd = fileString.indexOf('\n', indexOfTodoStart)
      if (indexOfTodoEnd === -1) indexOfTodoEnd = fileString.length // In case, if TODO ends at the end of the file without new line
      let todoString = fileString.slice(indexOfTodoStart, indexOfTodoEnd) // Isolating one TODO from general file string: e.g.: "// TODO : sample text" -->

      const indexOfTodoHeaderEnd = todoString.search(/todo/i) + 4 // -->  7  -->
      todoString = todoString.slice(indexOfTodoHeaderEnd) // -->  " : sample text"  -->

      const indexOfTodoBodyStart = todoString.search(/[^ :]/) // -->  3  -->
      const todoBody = todoString.slice(indexOfTodoBodyStart) // --> as a result, there is a clean TODO body: "sample text"

      todos.push({ todoBody, fileName }) // Saving todo with the file name

      fileString = fileString.slice(indexOfTodoEnd) // Slicing whole file string for further search
      indexOfTodoStart = fileString.search(todoStartRegEx) // Finding next todo string for next iteration of search
    }
  })

  return todos
}

function parseDate(date) {
  if (date === '') return date

  const parsedDate = Date.parse(date)
  return Number.isNaN(parsedDate) ? 'Invalid' : date
}

function parseTodos(todos) {
  return todos.map((todo) => {
    let comment = todo.todoBody
    const { fileName } = todo
    const qtyOfSemicolons = (comment.match(/;/g) || []).length

    const userAndDate = { user: '', date: '' }
    const importance = (comment.match(/!/g) || []).length

    if (qtyOfSemicolons >= 0 && qtyOfSemicolons <= 1) {
      return { importance, ...userAndDate, comment, fileName }
    }

    Object.keys(userAndDate).forEach((key) => {
      const indexOfSemicolon = comment.indexOf(';')

      userAndDate[key] = comment.slice(0, indexOfSemicolon)
      comment = comment.slice(indexOfSemicolon + 1).trim()
    })

    userAndDate.date = parseDate(userAndDate.date)

    return { importance, ...userAndDate, comment, fileName }
  })
}

function getTodos() {
  return parseTodos(collectTodos())
}

function findMaxWidth(currentWidth, testingWidth, maximum) {
  if (testingWidth > currentWidth) {
    return testingWidth > maximum ? maximum : testingWidth
  }
  return currentWidth
}

function findColumnsWidth(todos) {
  // Minimum possible values as default
  let userWidth = 4
  let dateWidth = 4
  let commentWidth = 7
  let fileNameWidth = 8

  todos.forEach((todo) => {
    const { user, date, comment, fileName } = todo

    userWidth = findMaxWidth(userWidth, user.length, 10)
    dateWidth = findMaxWidth(dateWidth, date.length, 10)
    commentWidth = findMaxWidth(commentWidth, comment.length, 50)
    fileNameWidth = findMaxWidth(fileNameWidth, fileName.length, 15)
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
