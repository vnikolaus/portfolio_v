import { Injectable } from '@nestjs/common'
import connection from '../../db/conn'
import { IStocksRepository } from '../iMysqlStocksRepository'
import { MySqlReturnProps } from '../iMysqlReturnProps'
import { Stock } from '../../../domain/stock'

@Injectable()
export class MySqlStocksRepository implements IStocksRepository {
    async insert(stock: Stock): Promise<void> {
        try {
            const conn = await connection()
            const sql = process.env.INSERT_QUERY
    
            await conn.query(sql, [stock.id, stock.props.symbol, stock.props.openPrice, stock.props.currentPrice, stock.props.variation])
    
            console.log(`Stock inserted: ${stock.props.symbol}\nPrice: ${stock.props.currentPrice}\n`)
        } catch (err) {
            console.log(err);
        }
    }

    async find(symbol: string): MySqlReturnProps {
        try {
            const conn = await connection()
            const sql = `${process.env.FIND_QUERY_1} = '${symbol}' ${process.env.FIND_QUERY_2}`
    
            const [rows, fields] = await conn.query(sql, [symbol])
            return rows
        } catch (err) {
            console.log(err);
        }
    }

    async listByRange(symbol: string, range: number): MySqlReturnProps {
        try {
            const conn = await connection()
            const sql = `${process.env.RANGE_QUERY_1} = ? ${process.env.RANGE_QUERY_2}(${process.env.RANGE_QUERY_FUNCTION}(), ?) ${process.env.RANGE_QUERY_3}`
    
            const [rows, fields] = await conn.query(sql, [symbol, range])
            return rows
        } catch (err) {
            console.log(err);
        }
    }

    async listGroup(symbols: string[]): MySqlReturnProps {
        try {
            const map = symbols.map(async (symbol) => {
                const data = await this.find(symbol)
                return data[0]
            })

            const group = Array(map.length)
            for (let i = 0; i < group.length; i++) {
                group[i] = await map[i]
            }

            return group
        } catch (err) {
            console.log(err);
        }
    }

}
