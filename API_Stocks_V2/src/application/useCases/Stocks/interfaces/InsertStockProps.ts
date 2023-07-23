import { StocksDTO } from 'src/application/dtos/stocksDTO'

export interface InsertStockProps {
    insertRawData(stock: StocksDTO[]): Promise<void>
}
