import { DB } from "../../data/db";
import { BookRepository } from "../../data/repositories";
import { AuthorService } from "../AuthorService";
import { BookService } from "../BookService";
import { createAuthService } from "./authorServiceFactory";

export const createBookService = (db: DB) => {
    const repository = new BookRepository(db)
    const authorService: AuthorService = createAuthService(db)
     
    return new BookService(repository, authorService)
}