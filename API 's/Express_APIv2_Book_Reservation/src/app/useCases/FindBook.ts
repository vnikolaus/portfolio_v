import { BookRepository } from "@repositories/Book.repository";

export class FindBook {
    constructor(private readonly repository: BookRepository) {}

    async execute(id: string) {
        const output = await this.repository.find(id)
        return output
    }
}