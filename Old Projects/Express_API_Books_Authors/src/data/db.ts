import path from 'path'
import { AuthorProps, BookProps } from '../domain'
import { access, readFile, writeFile } from 'fs/promises'
import { constants } from 'fs'

export class DB {
    static instance: DB

    #authors: Map<string, AuthorProps> = new Map()
    #books: Map<string, BookProps> = new Map()

    #dbPath = path.resolve(__dirname, '.db.json')

    constructor() {
        if (!DB.instance) DB.instance = this
        return DB.instance
    }

    async save(): Promise<void> {
        return writeFile(
            this.#dbPath,
            JSON.stringify({
                authors: [...this.#authors.entries()],
                books: [...this.#books.entries()],
            })
        )
    }

    async #load(): Promise<void> {
        const readData = await readFile(this.#dbPath, 'utf-8')

        this.#authors = new Map(Array.isArray(JSON.parse(readData).authors) ? JSON.parse(readData).authors : new Map())
        this.#books = new Map(Array.isArray(JSON.parse(readData).books) ? JSON.parse(readData).authors : new Map())
    }

    async init(): Promise<void> {
        try {
            await access(this.#dbPath, constants.F_OK)
            await this.#load()
        } catch (error) {
            await this.save()
        }
    }

    async addBook(book: BookProps) {
        this.#books.set(book.id as string, book)
        await this.save()
        return book
    }

    async updateBook(bookId: string, updateData: Partial<BookProps>) {
        const { id, ...currentBook } = (await this.#books.get(bookId)) ?? {}
        delete updateData.id

        const newBook = { ...currentBook, ...updateData } as BookProps
        this.#books.set(bookId, newBook)

        await this.save()
        return this.getBook(bookId)
    }

    async deleteBook(id: string) {
        this.#books.delete(id)
        await this.save()
    }

    async getBook(id: string): Promise<BookProps | undefined> {
        return this.#books.get(id)
    }

    async listBooks(): Promise<BookProps[]> {
        return [...this.#books.values()]
    }

    async addAuthor(author: AuthorProps) {
        this.#authors.set(author.id as string, author)
        await this.save()
        return author
    }

    async updateAuthor(authorId: string, updateData: Partial<AuthorProps>) {
        const { id, ...currentAuthor } = (await this.#authors.get(authorId)) ?? {}
        delete updateData.id

        const newAuthor = { ...currentAuthor, ...updateData } as AuthorProps
        this.#authors.set(authorId, newAuthor)

        await this.save()
        return this.getAuthor(authorId)
    }

    async deleteAuthor(id: string) {
        await this.#authors.delete(id)
        await this.save()
    }

    async getAuthor(id: string): Promise<AuthorProps | undefined> {
        return this.#authors.get(id)
    }

    async listAuthors(): Promise<AuthorProps[]> {
        return [...this.#authors.values()]
    }
}
