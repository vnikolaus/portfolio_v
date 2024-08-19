import { NestMiddleware } from '@nestjs/common'
import { ValidateLogin } from './validations/ValidateLogin'
import { validate } from 'class-validator'
import { Request, Response } from 'express'

export class LoginMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: (error?: any) => void) {
        const { email, pwd } = req.body
        const loginRequest = new ValidateLogin()
        loginRequest.email = email
        loginRequest.pwd = pwd
        const validation = await validate(loginRequest)
        if (validation.length) {
            const { constraints } = validation.at(-1)
            return res.json({ error: Object.values(constraints).at(-1) })
        }
        next()
    }
}
