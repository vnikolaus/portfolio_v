import { NextFunction, Request, Response } from "express";
import { BookService } from "../../../services";
import z, { ZodError } from 'zod'

export const create = (bookService: BookService) => async(req: Request, res: Response, next: NextFunction) => {
    const schema = z.object({
        title: z.string(),
        authors: z.string().array(),
        description: z.string().max(300),
        pages: z.number(),
        isbn: z.string().min(1)
    })

    try {
        const bookObject = await schema.parseAsync(req.body)
        const createdBook = await bookService.create({...bookObject, id: ''})

        return res.status(201).json(createdBook)
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(422).json({
                message: err.message
            })
        }
        next(err)
    }
}