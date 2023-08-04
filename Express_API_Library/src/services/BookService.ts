import { BookRepository } from "../data/repositories";
import { Author, Book, BookProps } from "../domain";
import { AuthorService } from "./AuthorService";

export class BookService {
    #bookRepository : BookRepository

    #authorService: AuthorService

    constructor(bookRepository: BookRepository, authorService: AuthorService) {
        this.#bookRepository = bookRepository
        this.#authorService = authorService
    }

    async getAuthors(book: Book) {
        const authors: Author[] = []

        for (const i of book.object.authors) {
            try {
                const author = await this.#authorService.findById(i)
                authors.push(author)
            } catch (err) {
                console.warn(`Author from book ${book.object.id} was not found`)
            }
        }

        return authors
    }

    async listAll() {
        return this.#bookRepository.listAll()
    }

    async findById(id: string) {
        const book = await this.#bookRepository.findByPk(id)
        if (!book) throw new Error('Book not found')

        return book
    }

    async create(bookObject: BookProps) {
        const book = new Book(bookObject)
        const bookAlreadyExists = await this.#bookRepository.findBy('isbn', book.object.isbn)
        if (bookAlreadyExists) throw new Error('Book already exists.')

        return this.#bookRepository.save(book)
    }

    async update(searchId: string, updateData: Partial<BookProps>) {
        const bookExists = await this.findById(searchId)
        delete updateData.id

        const book = new Book({...bookExists.object, ...updateData})
        return this.#bookRepository.save(book)
    }

    async delete(id: string) {
        return this.#bookRepository.remove(id)
    }
}