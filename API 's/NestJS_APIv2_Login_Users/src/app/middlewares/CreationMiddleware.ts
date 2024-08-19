import { NestMiddleware } from '@nestjs/common'
import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { ValidateCreation } from './validations/ValidateCreation'

export class CreationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: (error?: any) => void) {
        const { email, pwd } = req.body
        const createRequest = new ValidateCreation()
        createRequest.email = email
        createRequest.pwd = pwd
        const validation = await validate(createRequest)
        if (validation.length) {
            const { constraints } = validation.at(-1)
            return res.json({ error: Object.values(constraints).at(-1) })
        }
        next()
    }
}
