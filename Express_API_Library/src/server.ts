
import { DB } from "./data/db"
import { start } from "./presentation"
import { AuthorService, BookService } from "./services"
import { createAuthService } from "./services/factories/authorServiceFactory"
import { createBookService } from "./services/factories/bookServiceFactory"

export interface Config {
    port: number
    services: {
        authorService: AuthorService
        bookService: BookService
    }
}

(async () => {
    const db = new DB()
    await db.init()

    const config: Config = {
        port: Number(process.env.PORT) || 3000,
        services: {
            authorService: createAuthService(db),
            bookService: createBookService(db)
        }
    }

    start(config)
})()