import { Injectable } from '@nestjs/common'
import { DATABASE, HOST, PWD, USER } from '../api/constants/db.constants'
import { createConnection } from 'mysql2'

@Injectable()
export class Database {
    async connection() {
        try {
            const connection = createConnection({
                host: HOST,
                user: USER,
                password: PWD,
                database: DATABASE,
            }).promise()
            return connection
        } catch (err) {
            console.log(err)
        }
    }
}
