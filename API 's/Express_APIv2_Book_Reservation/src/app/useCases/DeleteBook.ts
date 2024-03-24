import { BookRepository } from "@repositories/Book.repository";

export class DeleteBook {
    constructor(private readonly repository: BookRepository) {}

    async execute(id: string) {
        await this.repository.delete(id)
    }
}