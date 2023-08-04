import { Author, AuthorProps } from '../../domain'
import { DB } from '../db'

export class AuthorRepository {
    #DB: DB

    constructor(database: DB) {
        this.#DB = database
    }

    async listAll(): Promise<Author[]> {
        const authors = await this.#DB.listAuthors()

        return authors.map((author) => new Author(author))
    }

    async findByPk(id: string): Promise<Author | null> {
        const author = await this.#DB.getAuthor(id)

        if (!author) return null

        return new Author(author)
    }

    async findBy(props: keyof Omit<AuthorProps, 'id'>, value: any): Promise<Author | null>  {
        const authors = await this.#DB.listAuthors()
        const author = await authors.find((author) => author[props] === value)

        if (!author) return null

        return new Author(author)
    }

    async remove(id: string): Promise<void> {
        return this.#DB.deleteAuthor(id)
    }

    async save(author: Author): Promise<AuthorProps | undefined> {
        const authorObject = author.object

        if (await this.findByPk(author.object.id)) return this.#DB.updateAuthor(author.object.id, author.object)

        const newAuthor = await this.#DB.addAuthor(authorObject)
        return newAuthor
    }
}
