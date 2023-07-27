import { Controller, Post, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { Request as ReqExpress } from 'express'
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.authguard';
import { User } from '../user/entities/user.entity';
import { isPublic } from './decorators/isPublicDecorator';

export interface AuthRequest extends ReqExpress {
    user: User
}

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @isPublic() 
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }
}
