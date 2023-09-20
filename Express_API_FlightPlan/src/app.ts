import express from 'express'
import { fpRouter } from './app/routes/fp.routes'
import { errorMiddleware } from './app/middlewares/error.middleware'

class App {
    app: App

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    async middlewares() {
        this.app.use(express.json())
        this.app.use(errorMiddleware)
    }

    async routes() {
        this.app.use(fpRouter)
    }
}

export default new App().app
