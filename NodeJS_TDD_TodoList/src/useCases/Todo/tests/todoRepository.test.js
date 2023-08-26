const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')
const TodoRepository = require('../src/todoRepository')

const mockTodoDatabase =  [
    {
        name: 'test',
        age: 99,
        meta: { revision: 0, created: 1693016914081, version: 0 },
        '$loki': 1
    }
]

describe('TodoRepository', () => {
    let todoRepository
    let sandbox

    before(() => {
        todoRepository = new TodoRepository()
        sandbox = createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('Methods signature', () => {
        it('Should call find from lokijs', () => {
            const functionName = 'find'
            const returnedValue = mockTodoDatabase

            sandbox.stub(
                todoRepository.collection,
                functionName
            ).returns(returnedValue)

            const data = todoRepository.list()

            expect(data).to.be.deep.equal(returnedValue)
            expect(todoRepository.collection[functionName].calledOnce).to.be.ok
        })

        it('Should call insertOne from lokijs', () => {
            const functionName = 'insertOne'
            const returnedValue = true

            sandbox.stub( 
                todoRepository.collection,
                functionName
            ).returns(returnedValue)

            const result = todoRepository.create({ data: 'Test-NodeJS'  })

            expect(result).to.be.ok
            expect(todoRepository.collection[functionName].calledOnceWithExactly({ data: 'Test-NodeJS'  })).to.be.ok
        })
    })
})

