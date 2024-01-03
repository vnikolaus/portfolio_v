import { NextFunction, Request, Response } from 'express'
import z, { ZodError } from 'zod'
import { Product } from '../../domain/entities/Product'

export interface InsertRequest extends Request {
    product: Product
}

export interface UpdateRequest extends Request {
    update: Partial<Product>
}

export class Validator {
    static getProduct(req: Request, res: Response, next: NextFunction) {
        const uuidLength = 36
        try {
            const schema = z.object({
                id: z.string().length(uuidLength)
            })
            schema.parse(req.query)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const error = err.errors.at(-1)
                res.json({ error: error.message });
            } else {
                res.json({ error: 'Unexpected error' });
                console.error(err);
            }
        }
    }
    static insertProduct(req: InsertRequest, res: Response, next: NextFunction) {
        const nonNumberRegex = /[^0-9]/
        try {
            const schema = z.object({
                code: z.string().min(1).max(20),
                description: z.string().min(1).max(45),
                storage: z.string().length(2),
                price: z.string().min(1).max(15),
                supplier: z.string().length(6),
                barcode: z.string().length(9)
            })
            const validInput = schema.parse(req.body)
            if (nonNumberRegex.test(validInput.price)) throw new Error('Price must be only numbers')
            req.product = validInput
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const error = err.errors.at(-1)
                res.json({ error: error.message });
            } else {
                res.json({ error: err.message || 'Unexpected error' });
            }
        }
    }
    static updateProduct(req: UpdateRequest, res: Response, next: NextFunction) {
        try {
            const schema = z.object({
                description: z.string().max(45).optional(),
                storage: z.string().length(2).optional(),
                price: z.string().max(15).optional(),
                supplier: z.string().length(6).optional(),
                barcode: z.string().length(9).optional(),
            })
            const validInput = schema.parse(req.body)
            req.update = validInput
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const error = err.errors.at(-1)
                res.json({ error: error.message });
            } else {
                res.json({ error: 'Unexpected error' });
                console.error(err);
            }
        }
    }
    static deleteProduct(req: Request, res: Response, next: NextFunction) {
        const uuidLength = 36
        try {
            const schema = z.object({
                id: z.string().length(uuidLength)
            })
            schema.parse(req.params)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const error = err.errors.at(-1)
                res.json({ error: error.message });
            } else {
                res.json({ error: 'Unexpected error' });
                console.error(err);
            }
        }
    }
}