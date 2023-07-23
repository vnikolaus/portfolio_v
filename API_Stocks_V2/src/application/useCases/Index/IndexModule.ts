

import { Module } from '@nestjs/common'
import { MySqlStocksRepository } from 'src/application/repositories/implementations/MysqlStocksRepository';
import { IndexController } from './IndexController';
import { ListIndex } from './ListIndex';
import { InsertIndex } from './InsertIndex';

@Module({
    controllers: [IndexController],
    providers: [MySqlStocksRepository, ListIndex, InsertIndex],
})
export class IndexModule {}