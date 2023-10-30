import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common'
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Body() input: Input) {
        try {
            const token = await this.loginService.loginUser(input)
            return {
                user_token: token,
            }
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }
}

export type Input = {
    email: string
    pwd: string
}
