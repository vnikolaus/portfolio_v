import { Module } from '@nestjs/common'
import { HandleModule } from './app/modules/handle/handle.module'
import { StockModule } from './app/modules/stock/stock.module'
import { RepositoriesModule } from './infra/repositories/repositories.module'

@Module({
    imports: [HandleModule, StockModule, RepositoriesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
