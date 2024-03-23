import { DataSource } from 'typeorm'
import * as CONSTANTS from '../constants/database.constants'

export const dataSource = new DataSource({
    type: 'mysql',
    host: CONSTANTS.HOST,
    port: CONSTANTS.PORT,
    username: CONSTANTS.USERNAME,
    password: CONSTANTS.PASSWORD,
    database: CONSTANTS.DATABASE,
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
})
