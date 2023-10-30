import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../../database/schemas/User.schema'
import { UserRepositoryService } from './UserRepository.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [UserRepositoryService],
    exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
