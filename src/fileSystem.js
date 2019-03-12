const fs = require('fs')
const path = require('path')

// TODO PE; 2018-08-20; переименовать?
function getAllFilePathsWithExtension(directoryPath, extension, filePaths = []) {
  // TODO Anonymous Developer; 2016-03-17; Необходимо переписать этот код и использовать асинхронные версии функций для чтения из файла
  const fileNames = fs.readdirSync(directoryPath)
  for (const fileName of fileNames) { // eslint-disable-line no-restricted-syntax
    // TODO WinDev; ; Убедиться, что будет работать под Windows.
    const filePath = `${directoryPath}/${fileName}`
    if (fs.statSync(filePath).isDirectory()) {
      getAllFilePathsWithExtension(filePath, filePaths)
    } else if (filePath.endsWith(`.${extension}`)) {
      filePaths.push(filePath)
    }
  }
  return filePaths
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8') // TODO Veronika; 2018-08-16; сделать кодировку настраиваемой
}

function getFiles() {
  const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js')
  return filePaths.map(filePath => ({ fileString: readFile(filePath), fileName: path.basename(filePath) }))
}

// TODO Digi; 2018-09-21; Добавить функцию getFileName, которая по пути файла будет возвращать его имя. Воспользоваться модулем path из Node.js

module.exports = {
  getAllFilePathsWithExtension,
  readFile,
  getFiles,
}
