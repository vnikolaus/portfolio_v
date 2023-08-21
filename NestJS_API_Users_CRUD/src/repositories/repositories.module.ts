import { Module } from '@nestjs/common'
import { RepositoriesService } from './repositories.service'
import { UserSchema } from 'src/database/schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [RepositoriesService],
    exports: [RepositoriesService],
})
export class RepositoriesModule {}
