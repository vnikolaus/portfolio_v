import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { StoreTokens } from '../../useCases/Tokens/StoreTokens';
import { MysqlTokensRepository } from '../../repositories/implementations/MysqlTokensRepository';
import { SHA256 } from 'crypto-js';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private mySqlTokensRepository: MysqlTokensRepository, private storeTokens: StoreTokens) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const { token_key } = req.body
            if (token_key === undefined) throw new Error(`User need to login.`)

            const [ bearer , token ] = String(token_key).split(' ')
            if (bearer !== 'Bearer' || !token) throw new Error(`Invalid Params.`)

            const tokenHash = SHA256(token)
            const activeToken = await this.mySqlTokensRepository.findToken(String(tokenHash))
            if (!activeToken[0]) throw new Error(`Params not found.`)

            const today = new Date().getDate()
            const activeTokenDate = new Date(activeToken[0].updated_at).getDate()
            if (activeTokenDate !== today) throw new Error(`Token expires.`)

            const validToken = await this.storeTokens.valid(token)
            if (!validToken) throw new Error(`Invalid Params.`)

            return next()
        } catch (err) {
            res.status(401).json({ message: err.message })
        }
  }
}