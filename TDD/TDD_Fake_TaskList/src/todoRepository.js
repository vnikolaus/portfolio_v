const Loki = require('lokijs')

class TodoRepository {
    constructor() {
        const db = new Loki('todo', {})
        this.collection  = db.addCollection('collection')
    }

    list() {
        return this.collection.find()
    }

    create(todo) {
        return this.collection.insertOne(todo)
    }
}

module.exports = TodoRepository