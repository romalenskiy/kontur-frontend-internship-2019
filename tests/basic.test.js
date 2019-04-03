const path = require('path')
const child = require('child_process')

let proc
const exec = path.join(__dirname, '../src', 'index.js')

describe('Базовые проверки', () => {
  beforeEach(() => {
    proc = child.exec(`node ${exec}`)
  })

  afterEach(() => {
    proc.kill()
  })

  test('должен писать приветственное сообщение', (done) => {
    proc.stdout.once('data', (output) => {
      expect(output.toString('utf-8')).toBe('Please, write your command!\n')
      done()
    })
  })

  test('должен писать об ошибочной команде', (done) => {
    proc.stdout.once('data', () => {
      proc.stdin.write('hi!\r')
      proc.stdout.once('data', (output) => {
        expect(output.toString('utf-8')).toBe('wrong command\n')
        done()
      })
    })
  })

  test('должен завершать процесс после команды exit', (done) => {
    proc.stdout.once('data', () => {
      proc.stdin.write('exit\r')
      proc.once('exit', (code) => {
        expect(code).toBe(0)
        done()
      })
    })
  })
})
