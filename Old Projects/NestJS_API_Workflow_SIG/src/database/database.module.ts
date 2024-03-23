import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import * as CONSTANTS from '../constants/database.constants'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: CONSTANTS.HOST,
            port: CONSTANTS.PORT,
            username: CONSTANTS.USERNAME,
            password: CONSTANTS.PASSWORD,
            database: CONSTANTS.DATABASE,
            entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            keepConnectionAlive: true,
        }),
    ],
})
export class DatabaseModule {}
