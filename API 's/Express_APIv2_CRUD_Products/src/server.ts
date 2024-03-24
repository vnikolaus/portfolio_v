import express, { Express, urlencoded } from 'express'

export class App {
    private #app: Express

    constructor() {
        this.#app = express()
        this.middlewares()
        this.connect()
    }

    get app() {
        return this.#app
    }

    middlewares() {
        this.#app.use(urlencoded({ extended: true }))
        this.#app.use(express.json())
    }

    connect() {
        const PORT = process.env.PORT ?? 3000
        this.#app.listen(+PORT, () => console.log(`API online: http://localhost:${PORT}`))
    }
}