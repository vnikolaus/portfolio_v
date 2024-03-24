import { Module } from '@nestjs/common'
import { HandleService } from './handle.service'
import { HandleController } from './handle.controller'
import { StockModule } from '../stock/stock.module'

@Module({
    imports: [StockModule],
    controllers: [HandleController],
    providers: [HandleService],
    exports: [HandleService],
})
export class HandleModule {}
