import { MySqlReturnProps } from '../../repositories/iMysqlReturnProps'
import { ListStockProps } from './interfaces/ListStocksProps'
import { MySqlStocksRepository } from '../../repositories/implementations/MysqlStocksRepository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListStocks implements ListStockProps {
    constructor(private mySqlStocksRepository: MySqlStocksRepository) {}

    async findUnique(symbol: string): MySqlReturnProps {
        try {
            const stock = await this.mySqlStocksRepository.find(symbol)
            return stock
        } catch (err) {
            console.log(err);
        }
    }

    async listStocks(symbol: string[]): MySqlReturnProps {
        try {
            const data = await this.mySqlStocksRepository.listGroup(symbol)
            return data
        } catch (err) {
            console.log(err);
        }
    }

    async findByRange(symbol: string, range = 1): MySqlReturnProps {
        try {
            const data = await this.mySqlStocksRepository.listByRange(symbol, range)
            return data
        } catch (err) {
            console.log(err);
        }
    }
}
