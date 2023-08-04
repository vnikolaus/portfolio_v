import { NextFunction, Request, Response } from "express";
import { BookService } from "../../../services";
import z, { ZodError } from 'zod'

export const update = (bookService: BookService) => async(req: Request, res: Response, next: NextFunction) => {
    const schema = z.object({
        title: z.string(),
        authors: z.string().array(),
        description: z.string().max(300),
        pages: z.number(),
        isbn: z.string().min(1)
    })

    try {
        const { id } = req.params
        const bookObject = await schema.parseAsync(req.body)

        const updatedBook = await bookService.update(id, bookObject)
        
        res.status(201).json(updatedBook)
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(422).json({
                message: err.message
            })
        }
        next(err)
    }
}