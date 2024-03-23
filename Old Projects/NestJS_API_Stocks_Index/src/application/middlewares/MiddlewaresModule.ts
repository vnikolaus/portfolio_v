

import { Module, MiddlewareConsumer } from '@nestjs/common'
import { MysqlTokensRepository } from '../repositories/implementations/MysqlTokensRepository';
import { StoreTokens } from '../useCases/Tokens/StoreTokens';
import { AuthenticationMiddleware } from './auth/Authentication';
import { StocksController } from '../useCases/Stocks/StocksController';
import { IndexController } from '../useCases/Index/IndexController';


@Module({
    controllers: [],
    providers: [MysqlTokensRepository, StoreTokens],
})
export class MiddlewaresModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes(StocksController, IndexController)
    }
}