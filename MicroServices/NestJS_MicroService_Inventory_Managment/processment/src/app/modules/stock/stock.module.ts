import { Module } from '@nestjs/common'
import { StockService } from './stock.service'
import { RepositoriesModule } from 'src/infra/repositories/repositories.module'

@Module({
    imports: [RepositoriesModule],
    providers: [StockService],
    exports: [StockService],
})
export class StockModule {}
