import { NextFunction, Request, Response } from "express";
import { AuthorService } from "../../../services";
import z, { ZodError } from 'zod'
import { DateTime } from "luxon";

export const update = (authorService: AuthorService) => async(req: Request, res: Response, next: NextFunction) => {
        const schema = z.object({
            name: z.string(),
            email: z.string().email(),
            bornDate: z.string().min(1)
                .transform(value => DateTime.fromISO(value))
                .refine(value => value.isValid)
                .transform(value => value.toJSDate()),
            bio: z.string().max(300)
        })

    try {
        const { id } = req.params
        console.log("id: ", id);
        const authorObject = await schema.parseAsync(req.body)

        const updatedAuthor = await authorService.update(id, authorObject)
        
        res.status(201).json(updatedAuthor)
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(422).json({
                message: err.message
            })
        }
        next(err)
    }
}