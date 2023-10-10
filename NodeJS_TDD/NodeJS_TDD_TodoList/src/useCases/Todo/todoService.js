class TodoService {
    constructor({ todoRepository }) {
        this.todoRepository = todoRepository
    }

    create(todo) {
        if (!todo.isValid()) {
            return {
                error: {
                    message: 'invalid params',
                    data: todo
                }
            }
        }

        const { when } = todo
        const today = new Date()

        const todoObj = {
            ...todo,
            status: when > today ? 'Pending' : 'Late'
        }

        return this.todoRepository.create(todoObj)
    }
    
    list() {
        return this.todoRepository.list().map(({ meta, $loki, ...props }) => props)
    }
}

module.exports = TodoService