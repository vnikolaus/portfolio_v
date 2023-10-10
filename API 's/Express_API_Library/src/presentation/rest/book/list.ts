import { Request, Response } from "express";
import { BookService } from "../../../services";

export const list = (bookService: BookService) => async(req: Request, res: Response) => {
    const books = await bookService.listAll()
    res.status(200).json(books)
}