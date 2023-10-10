import { Injectable } from '@nestjs/common'
import { StocksDTO } from '../../dtos/stocksDTO'
import { InsertStockProps } from './interfaces/InsertStockProps'
import { MySqlStocksRepository } from '../../repositories/implementations/MysqlStocksRepository'
import { Stock } from '../../../domain/stock'

@Injectable()
export class InsertStocks implements InsertStockProps {
    constructor(private mySqlStocksRepository: MySqlStocksRepository) {}

    async insertRawData(stocks: StocksDTO[]): Promise<void> {
        try {
            stocks.forEach(async (stock) => {
                const instanceStock = Stock.instance(stock) 
                const databaseStock = await this.mySqlStocksRepository.find(stock.symbol)
                
                if (databaseStock[0] !== undefined && instanceStock.props.currentPrice === Number(databaseStock[0].current_price))
                    return console.log(
                        `No updates for now...  |  Stock: ${stock.symbol}   - ${new Date().toLocaleTimeString('pt-BR')}\nPrices: stock: ${instanceStock.props.currentPrice}  dataBaseStock: ${databaseStock[0].current_price}\n`
                    )
    
                await this.mySqlStocksRepository.insert(instanceStock)
            })
        } catch (err) {
            console.log(err);
        }
    }
}
