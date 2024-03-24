import { BookProps, Config, RequestData } from "@types/types";
import { AddBook } from "@useCases/AddBook";
import { DeleteBook } from "@useCases/DeleteBook";
import { FindBook } from "@useCases/FindBook";
import z from 'zod';
import { Controller } from "./Controller";

export class BookController implements Controller {
    async execute({ app, repositories }: Config) {
        app.on('post', '/add/book', async ({ body }: RequestData<BookProps>) => {
            const zod = z.object({
                title: z.string().min(1),
                author: z.string().min(1),
                pages: z.number().min(1),
            })
            const valid_body = zod.parse(body)
            const add_book = new AddBook(repositories.book)
            const output = await add_book.execute(valid_body)
            return {
                status: 201,
                output
            }
        })
        app.on('get', '/book/:id', async ({ params }: RequestData<{ id: string }>) => {
            const zod = z.object({
                id: z.string().min(1),
            })
            const { id } = zod.parse(params)
            const find_book = new FindBook(repositories.book)
            const output = await find_book.execute(id)
            return { output }
        })
        app.on('delete', '/book/:id', async ({ params }: RequestData<{ id: string }>) => {
            const zod = z.object({
                id: z.string().min(1),
            })
            const { id } = zod.parse(params)
            const delete_book = new DeleteBook(repositories.book)
            await delete_book.execute(id)
            return { output: { deleted_id: id }}
        })
    }
}