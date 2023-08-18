import { Module } from '@nestjs/common'
import { Database } from './db.service'

@Module({
    imports: [],
    providers: [Database],
    exports: [Database],
})
export class DatabaseModule {}
