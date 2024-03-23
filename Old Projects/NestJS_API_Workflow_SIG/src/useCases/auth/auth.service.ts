import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserDTO } from '../user/dto/user.dto'
import { UserService } from '../user/user.service'
import { AcessTokenProps } from './typings/types'
import { User } from '../../entities/user.entity'
import { SECRET } from '../../constants/token.constants'
import { SessionError } from './errors/errors'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<User> {
        try {
            const user = await this.userService.findUser({ login: login })

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) throw new UnauthorizedException(`Invalid params.`)

            return {
                ...user,
                password: undefined,
            }
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async login({ id, name, login }: UserDTO): Promise<AcessTokenProps> {
        try {
            const payload = { id, name, login }

            const token = this.jwtService.sign(payload, { secret: SECRET })

            return { accessToken: token }
        } catch (err) {
            throw new SessionError(err.code)
        }
    }
}
