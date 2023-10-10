const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const Todo = require('../src/todo')

describe('todo', () => {
    describe('New instance', () => {
        it('Should create a new instance of Todo', () => {
            const todo = new Todo({
                text: 'Test',
                when: new Date('2023-01-01')
            })
    
            expect(todo).to.be.instanceOf(Todo)
        })
    })

    describe('Validations', () => {
        it('Should not validate a todo without text', () => {
            const todo = new Todo({
                text: '',
                when: new Date('2023-01-01')
            })
    
            expect(todo.isValid()).to.be.not.ok
        })

        it('Should not validate a todo with wrong date', () => {
            const todo = new Todo({
                text: 'Test',
                when: new Date('20-01-01')
            })
    
            expect(todo.isValid()).to.be.not.ok
        })
    })
})