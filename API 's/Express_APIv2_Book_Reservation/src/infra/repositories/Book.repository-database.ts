import { Book } from "@entities/Book";
import { PrismaClient } from "@prisma/client";
import { BookRepository } from "@repositories/Book.repository";

export class BookRepositoryDatabase implements BookRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async find(id: string) {
        id = parseInt(id)
        const book = await this.prisma.book.findUnique({
            where: { id },
            include: {
                reservations: {
                    where: {
                        book_id: id
                    }
                }
            }
        })
        return book
    }
    
    async insert(book: Book): Promise<Book> {
        const result = await this.prisma.book.create({
            data: book
        })
        return result
    }

    async delete(id: string): Promise<void> {
        id = parseInt(id)
        await this.prisma.book.delete({
            where: { id }
        })
    }
}