import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { UserService } from '../User/user.service'
import { Input } from './login.controller'

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async loginUser(input: Input) {
        const validUser = await this.userService.findOne(input.email)
        if (!validUser) throw new Error('Invalid user')
        const hashedPwd = String(validUser.pwd)
        const validPassword = await bcrypt.compare(input.pwd, hashedPwd)
        if (!validPassword) throw new Error('Invalid password')
        const payload = { email: input.email, pwd: hashedPwd, date: +new Date() }
        const token = await this.jwtService.sign(payload, { secret: process.env.TOKEN_SECRET })
        return token
    }
}
