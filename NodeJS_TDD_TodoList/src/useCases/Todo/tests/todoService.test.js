const { describe, it, before, afterEach, beforeEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')
const TodoService = require('../src/todoService')
const Todo = require('../src/todo')

describe('todoService', () => {
    let todoService
    let sandbox

    before(() => {
        sandbox = createSandbox()
    })

    afterEach(() => sandbox.restore())

    describe('list', () => {
        const mockTodoDatabase =  [
            {
                name: 'test',
                age: 99,
                meta: { revision: 0, created: 1693016914081, version: 0 },
                '$loki': 1
            }
        ]

        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    list: sandbox.stub().returns(mockTodoDatabase)
                }
            }

            todoService = new TodoService(dependencies)
        })

        it('Should return a formated data', () => {
            const data = todoService.list()
            const [{ meta, $loki, ...props }] = mockTodoDatabase

            expect(data).to.be.deep.equal([props])
        })
    })

    describe('create', () => {
        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    create: sandbox.stub().returns(true)
                }
            }

            todoService = new TodoService(dependencies)
        })

        it('Shouldn\'t save a new todo with invalid data', () => {
            const todo = new Todo({
                text: '',
                when: ''
            })
            Reflect.deleteProperty(todo, 'id')
            const expected = {
                error: {
                    message: 'invalid params',
                    data: todo
                }
            }

            const newTodo = todoService.create(todo)
            expect(newTodo).to.be.deep.equal(expected)
        })

        it('Should save a new todo with late status', () => {
            const todo = new Todo({
                text: 'Todo test',
                when: new Date('2023-01-01 12:00:00 GMT-3')
            })

            const today = new Date('2023-01-02')
            sandbox.useFakeTimers(today.getTime())

            expect(todoService.create(todo)).to.be.true
        })

        it('Should save a new todo with pending status', () => {
            const todo = new Todo({
                text: 'Todo test',
                when: new Date('2023-01-03 12:00:00 GMT-3')
            })

            const today = new Date('2023-01-02')
            sandbox.useFakeTimers(today.getTime())

            expect(todoService.create(todo)).to.be.true
        })
    })
})