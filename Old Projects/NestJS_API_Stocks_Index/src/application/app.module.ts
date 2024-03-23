import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { StocksModule } from '../application/useCases/Stocks/StocksModule'
import { IndexModule } from './useCases/Index/IndexModule'
import { TokensModule } from './useCases/Tokens/TokensModule'
import { MiddlewaresModule } from './middlewares/MiddlewaresModule'

@Module({
    imports: [MiddlewaresModule, StocksModule, IndexModule, TokensModule],
    controllers: [AppController],
    providers: [],
})

export class AppModule {}
