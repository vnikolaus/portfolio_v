import { Stock } from '../../domain/stock'
import { MySqlReturnProps } from './iMysqlReturnProps'

export interface IStocksRepository {
    insert(stock: Stock): Promise<void>
    find(symbol: string): MySqlReturnProps
    listByRange(symbol: string, range: number): MySqlReturnProps
    listGroup(symbols: string[]): MySqlReturnProps
}
