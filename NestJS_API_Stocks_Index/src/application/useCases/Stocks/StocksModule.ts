import { Module } from '@nestjs/common'
import { StocksController } from './StocksController';
import { ListStocks } from './ListStocks';
import { InsertStocks } from './InsertStocks';
import { MySqlStocksRepository } from 'src/application/repositories/implementations/MysqlStocksRepository';


@Module({
    controllers: [StocksController],
    providers: [MySqlStocksRepository, ListStocks, InsertStocks],
})
export class StocksModule {}
