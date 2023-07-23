import { Injectable } from '@nestjs/common'
import { createConnection } from 'mysql2'

@Injectable()
export class Connection {
    async connection() {
        try {
            const connection = createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PWD,
                database: process.env.MYSQL_DATABASE,
            }).promise()
            
            return connection
        } catch (err) {
            console.log(err);
        }
    }
}

export default new Connection().connection
