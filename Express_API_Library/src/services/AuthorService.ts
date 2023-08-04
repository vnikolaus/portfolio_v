import { AuthorRepository } from '../data/repositories'
import { Author, AuthorProps } from '../domain'

export class AuthorService {
    #authorRepository: AuthorRepository

    constructor(authorRepository: AuthorRepository) {
        this.#authorRepository = authorRepository
    }

    async listAll() {
        return this.#authorRepository.listAll()
    }

    async findById(id: string) {
        const author = await this.#authorRepository.findByPk(id)
        if (!author) throw new Error('Author not found')

        return author
    }

    async create(authorObject: AuthorProps) {
        const author = new Author(authorObject)
        const authorAlreadyExists = await this.#authorRepository.findBy('email', author.object.email)
        if (authorAlreadyExists) throw new Error('Author already exists.')

        return this.#authorRepository.save(author)
    }

    async update(searchId: string, updateData: Partial<AuthorProps>) {
        const authorExists = await this.findById(searchId)
        delete updateData.id

        const author = new Author({ ...authorExists.object, ...updateData })
        return this.#authorRepository.save(author)
    }

    async delete(id: string) {
        return this.#authorRepository.remove(id)
    }
}
