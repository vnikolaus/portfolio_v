import { NextFunction, Request, Response } from "express";
import { AuthorService } from "../../../services";

export const remove = (authorService: AuthorService) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const author = await authorService.delete(id)

        if (typeof id !== 'string') throw new Error(`ID invalid`)
        
        res.status(200).json(author)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(404).json({
                message: err.message
            })
        }
        next(err)
    }
}