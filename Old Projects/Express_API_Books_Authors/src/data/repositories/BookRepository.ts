import { Book, BookProps } from "../../domain";
import { DB } from "../db";

export class BookRepository {
    #DB: DB

    constructor(database: DB) {
        this.#DB = database
    }

    async listAll(): Promise<Book[]> {
        const books = await this.#DB.listBooks()

        return books.map(book => new Book(book))
    }

    async findByPk(id: string): Promise<Book | null> {
        const book = await this.#DB.getBook(id)

        if(!book) return null

        return new Book(book)
    }
 
    async findBy(props: keyof Omit<BookProps, 'id'>, value: any): Promise<Book | null> {
        const books = await this.#DB.listBooks()
        const book = await books.find(book => book[props] === value)

        if (!book) return null

        return new Book(book)
    }

    async remove(id: string): Promise<void> {
        return this.#DB.deleteBook(id)
    }

    async save(book: Book): Promise<BookProps | undefined> {
        const bookObject = book.object

        if (await this.findByPk(book.object.id)) return this.#DB.updateBook(book.object.id, book.object)

        return this.#DB.addBook(bookObject)
    }
}