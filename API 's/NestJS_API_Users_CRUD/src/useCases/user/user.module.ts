import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { RepositoriesModule } from 'src/repositories/repositories.module'

@Module({
    imports: [RepositoriesModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
