import express from 'express'
import { buyerRouter } from './app/routes/ticket.routes'

class App {
    app: App

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/ticket', buyerRouter)
    }
}

export default new App().app
