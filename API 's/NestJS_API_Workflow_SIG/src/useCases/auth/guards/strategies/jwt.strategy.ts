import { config } from 'dotenv'
config()

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserFromJwt, UserPayload } from '../../typings/types'
import { SECRET } from 'src/constants/token.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET,
        })
    }

    async validate({ id, login, name }: UserPayload): Promise<UserFromJwt> {
        return {
            id,
            login,
            name,
        }
    }
}
