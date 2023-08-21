import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DB_CONNECTION } from 'src/constants/db.constants'

@Module({
    imports: [MongooseModule.forRoot(DB_CONNECTION)],
})
export class DatabaseModule {}
