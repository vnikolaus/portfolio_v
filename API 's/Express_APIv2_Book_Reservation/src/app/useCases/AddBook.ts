import { Book } from "@entities/Book";
import { BookRepository } from "@repositories/Book.repository";
import { BookProps } from "@types/types";

export class AddBook {
    constructor(private readonly repository: BookRepository) {}

    async execute(input: BookProps) {
        const book = new Book(input)
        const output = await this.repository.insert(book)
        return output
    }
}