import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { userSchema } from '../../database/schemas/User.schema'
import { UserRepositoryService } from './UserRepository.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
    providers: [UserRepositoryService],
    exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
