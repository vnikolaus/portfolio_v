import { SHA256 } from 'crypto-js'
import { JwtService } from '@nestjs/jwt'
import { StoreTokensProps, TokensProps } from "./interfaces/StoreTokensProps";
import { Injectable } from "@nestjs/common";
import { MysqlTokensRepository } from '../../repositories/implementations/MysqlTokensRepository';

@Injectable()
export class StoreTokens implements StoreTokensProps {
    constructor(private mysqlTokensRepository: MysqlTokensRepository, private jwtService: JwtService) {}

    async store(id: number, key: string): Promise<TokensProps> {
        try {
            if (id === 1) {
                const token = await this.jwtService.signAsync(`${id}${key}`, { secret: process.env.TOKENS_SECRET })
                return { message: token }
            }

            const _id = String(id)
            const date = new Date().getTime()
    
            const token = await this.jwtService.signAsync(`${_id}${date}${key}`, { secret: process.env.TOKENS_SECRET })
    
            const tokenHash = SHA256(token)
            await this.update(String(tokenHash), key)
    
            return { message: token }
        } catch (err) {
            console.log(err);
        }
    }

    async valid(token: string): Promise<TokensProps> {
        try {
            const validation = await this.jwtService.verifyAsync(token, { secret: process.env.TOKENS_SECRET })
            return validation
        } catch (err) {
            console.log(err);
        }
    }

    async update(token: string, key: string): Promise<void> {
        try {
            await this.mysqlTokensRepository.updateToken(token, key)
        } catch (err) {
            console.log(err);
        }
    }
    
}