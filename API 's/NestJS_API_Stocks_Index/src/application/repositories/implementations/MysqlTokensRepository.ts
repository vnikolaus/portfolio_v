import connection from '../../db/conn';
import { ITokensRepository } from '../iMysqlTokensRepository'
import { MySqlReturnProps } from '../iMysqlReturnProps';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlTokensRepository implements ITokensRepository {
    async findKey(key: string): MySqlReturnProps | null {
        try {
            const sql = `${process.env.APIKEY_QUERY} = ?`
            const conn = await connection()
            const [ row, fields ] = await conn.query(sql, [key])
            return row
        } catch (err) {
            console.log(err);
        }
    }
    
    async findToken(token: string): MySqlReturnProps | null {
        try {
            const sql = `${process.env.FIND_TOKEN_QUERY} = ?`
            const conn = await connection()
            const [ row, fields ] = await conn.query(sql, [token])
            return row
        } catch (err) {
            console.log(err);
        }
    }

    async updateToken(token: string, key: string): Promise<void> {
        try {
            const sql = `${process.env.UPDATE_TOKEN_QUERY_1} = ? ${process.env.UPDATE_TOKEN_QUERY_2} = ?`
            const conn = await connection()
            const [result] = await conn.query(sql, [token, key])
            // @ts-ignore
            console.log('TOKEN UPDATE\nResult : ', result.info);
        } catch (err) {
            console.log(err);
        }
    }
}
