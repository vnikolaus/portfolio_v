import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokensController } from './TokensController';
import { MysqlTokensRepository } from '../../repositories/implementations/MysqlTokensRepository';
import { StoreTokens } from './StoreTokens';


@Module({
    imports: [JwtModule.register({
        global: true,
    })],
    controllers: [TokensController],
    providers: [JwtService, MysqlTokensRepository, StoreTokens],
})
export class TokensModule {}
