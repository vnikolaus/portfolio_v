import { NextFunction, Request, Response } from "express";
import { BookService } from "../../../services";

export const getAuthors = (bookService: BookService) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const book = await bookService.findById(id)
        const authors = await bookService.getAuthors(book)

        if (!authors) throw new Error(`Authors not found`)
        
        res.status(200).json(authors)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(404).json({
                message: err.message
            })
        }
        next(err)
    }
}