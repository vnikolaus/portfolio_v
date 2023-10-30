import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepositoryModule } from 'src/infra/repositories/User/UserRepository.module'

@Module({
    imports: [UserRepositoryModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
