import { NextFunction, Request, Response } from "express";
import { BookService } from "../../../services";

export const find = (bookService: BookService) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const book = await bookService.findById(id)

        if (typeof id !== 'string') throw new Error(`ID invalid`)
        
        res.status(200).json(book)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(404).json({
                message: err.message
            })
        }
        next(err)
    }
}