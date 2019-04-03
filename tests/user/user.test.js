const path = require('path')
const child = require('child_process')

let proc
const exec = path.join(__dirname, '../../src', 'index.js')


describe('Команда user', () => {
  beforeAll(() => {
    process.chdir(__dirname)
  })

  beforeEach(() => {
    proc = child.exec(`node ${exec}`)
  })

  afterEach(() => {
    proc.kill()
  })

  describe('с аргументом "pe"', () => {
    test('должен показывать список todo с правильным user', (done) => {
      const result = `
  !  |  user  |  date        |  comment         |  fileName       
------------------------------------------------------------------
  !  |  Pe    |  2018-12-26  |  Работать пора!  |  jsWithTodo.js  
  !  |  Pe    |  2018-12-26  |  Работать пора!  |  jsWithTodo.js  
  !  |  Pe    |  2018-12-26  |  Работать пора!  |  jsWithTodo.js  
------------------------------------------------------------------
  `.trim()

      proc.stdout.once('data', () => {
        proc.stdin.write('user pe\r')
        proc.stdout.once('data', (output) => {
          expect(output.toString('utf-8').trim()).toBe(result)
          done()
        })
      })
    })
  })

  describe('с аргументом "ve"', () => {
    test('должен показывать список todo с правильным user', (done) => {
      const result = `
  !  |  user        |  date  |  comment      |  fileName       
---------------------------------------------------------------
     |  Veronika    |  2018  |  Sample Text  |  jsWithTodo.js  
     |  VeRoNiKa69  |  2018  |  Sample Text  |  jsWithTodo.js  
     |  VERONIKA    |  2018  |  Sample Text  |  jsWithTodo.js  
     |  ve          |  2018  |  Sample Text  |  jsWithTodo.js  
     |  Velka       |  2018  |  Sample Text  |  jsWithTodo.js  
---------------------------------------------------------------
  `.trim()

      proc.stdout.once('data', () => {
        proc.stdin.write('user ve\r')
        proc.stdout.once('data', (output) => {
          expect(output.toString('utf-8').trim()).toBe(result)
          done()
        })
      })
    })
  })
})
