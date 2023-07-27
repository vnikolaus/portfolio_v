import { config } from 'dotenv';
config()

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type UserPayload = { sub: string, email: string, name: string }

type UserFromJwt = { id: string, email: string, name: string }


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate({ sub, email, name }: UserPayload): Promise<UserFromJwt> {
    return {
      id: sub,
      email,
      name,
    };
  }
}