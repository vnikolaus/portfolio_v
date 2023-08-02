import { NestMiddleware } from '@nestjs/common'
import { ValidateLogin } from './validations/validateLogin'
import { validate } from 'class-validator'

export class LoginMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: (error?: any) => void) {
        const { login, password } = req.body

        const loginRequest = new ValidateLogin()

        loginRequest.login = login
        loginRequest.password = password

        const validation = await validate(loginRequest)

        if (validation.length) {
            validation.reduce((add, err) => {
                return [...add, ...Object.values(err)]
            }, [])
        }

        next()
    }
}
