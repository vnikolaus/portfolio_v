import { Module } from '@nestjs/common'
import { UserModule } from './app/modules/User/user.module'
import { DatabaseModule } from './infra/database/database.module'
import { UserRepositoryModule } from './infra/repositories/User/UserRepository.module'
import { LoginModule } from './app/modules/Login/login.module'

@Module({
    imports: [DatabaseModule, UserModule, UserRepositoryModule, LoginModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
