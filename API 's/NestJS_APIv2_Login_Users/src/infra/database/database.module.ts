import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { config as dotenv } from 'dotenv'
dotenv()

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGODB_URL)],
})
export class DatabaseModule {}
