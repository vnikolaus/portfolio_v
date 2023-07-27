import * as bcrypt from 'bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

type TokenProps = {
    access_token: string
}

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(_email: string, _password: string) {
        const user = await this.userService.findByEmail(_email)

        const { password } = user

        const matchPassword = await bcrypt.compare(_password, password)
        if (!matchPassword) throw new UnauthorizedException()

        return {
            ...user,
            password: undefined
        }
    }

    async login({ id, email, name }: User): Promise<TokenProps> {
        const payload = { id, email, name }
        const jwtToken = this.jwtService.sign(payload, { secret: process.env.SECRET })

        return { access_token: jwtToken }
    }
}
