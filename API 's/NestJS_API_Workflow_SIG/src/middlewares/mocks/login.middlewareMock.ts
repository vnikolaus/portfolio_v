import { validate } from 'class-validator'
import { ValidateLogin } from '../validations/validateLogin'
import { MockError } from '../../useCases/auth/errors/errors'

export class LoginMiddlewareMock {
    async login(login: any, password: any) {
        const loginRequest = new ValidateLogin()

        loginRequest.login = login
        loginRequest.password = password

        const validation = await validate(loginRequest)

        if (validation.length) {
            throw new MockError()
        }
    }
}
