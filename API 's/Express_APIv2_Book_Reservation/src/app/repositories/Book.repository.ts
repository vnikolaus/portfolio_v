import { Book } from "@entities/Book"

export interface BookRepository {
    find(id: string): Promise<Book>
    insert(book: Book): Promise<Book>
    delete(id: string): Promise<void>
}