import { config } from 'dotenv'
config()

import { MysqlTokensRepository } from './repositories/implementations/MysqlTokensRepository'
import { StoreTokens } from './useCases/Tokens/StoreTokens'
import { JwtService } from '@nestjs/jwt'

import { FetchData } from './useCases/FetchData/FetchData'
import { MySqlStocksRepository } from './repositories/implementations/MysqlStocksRepository'
import { InsertStocks } from './useCases/Stocks/InsertStocks'
import { InsertIndex } from './useCases/Index/InsertIndex'
import { ListStocks } from './useCases/Stocks/ListStocks'
import { ListIndex } from './useCases/Index/ListIndex'

const mySqlTokensRepository = new MysqlTokensRepository()
const storeTokens = new StoreTokens(mySqlTokensRepository, new JwtService())

const fetchData = new FetchData()
const mySqlStocksRepository = new MySqlStocksRepository()
const insertStock = new InsertStocks(mySqlStocksRepository)
const insertIndex = new InsertIndex(mySqlStocksRepository)
const listStocks = new ListStocks(mySqlStocksRepository)
const listIndex = new ListIndex(mySqlStocksRepository)


export async function App() {
    try {
        const minute = 1000 * 60
    
        const promises = [
            fetchData.fetchRawData(process.env.SYMB_0),
            fetchData.fetchRawData(process.env.SYMB_1),
            fetchData.fetchRawData(process.env.SYMB_2),
            fetchData.fetchRawData(process.env.SYMB_3),
            fetchData.fetchRawData(process.env.SYMB_4),
            fetchData.fetchRawData(process.env.SYMB_5),
            fetchData.fetchRawData(process.env.SYMB_6),
        ]

        const rawData = await Promise.all(promises)

        setInterval(async () => {
            await insertStock.insertRawData(rawData)
        }, minute * 10)
        
    } catch (err) {
        console.log(err);
    }
}

export { mySqlStocksRepository, mySqlTokensRepository, insertStock, insertIndex, listStocks, listIndex, fetchData, storeTokens }
