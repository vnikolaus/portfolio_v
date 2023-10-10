import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { IsPublic } from './decorators/isPublic.decorator'
import { LocalAuthGuard } from './guards/local.guard'
import { AuthService } from './auth.service'
import { AuthRequest } from './typings/interfaces'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @IsPublic()
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }
}
