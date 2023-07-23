import { MySqlReturnProps } from 'src/application/repositories/iMysqlReturnProps'

export interface ListStockProps {
    listStocks(symbol: string[]): MySqlReturnProps
    findUnique(symbol: string): MySqlReturnProps
    findByRange(symbol: string, range: number): MySqlReturnProps
}
