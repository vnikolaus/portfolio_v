import { validate } from 'class-validator'

import { NestMiddleware, Injectable, BadRequestException } from '@nestjs/common'
import { LoginRequest } from './validations/LoginRequest'

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: (error?: any) => void) {
        const { email, password } = req.body
        
        const loginRequest = new LoginRequest()

        loginRequest.email = email
        loginRequest.password = password
        const validation = await validate(loginRequest)

        if (validation.length) {
          throw new BadRequestException(
              validation.reduce((add, err) => {
              return [...add, ...Object.values(err.constraints)];
            }, []),
          );
        }

        next()
    }
}