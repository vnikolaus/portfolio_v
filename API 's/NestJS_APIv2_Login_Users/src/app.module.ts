import { Module } from '@nestjs/common'
import { JwtGuard } from './app/modules/Auth/guard/JwtGuard'
import { LoginModule } from './app/modules/Login/login.module'
import { UserModule } from './app/modules/User/user.module'
import { DatabaseModule } from './infra/database/database.module'
import { UserRepositoryModule } from './infra/repositories/User/UserRepository.module'
import { AuthModule } from './app/modules/Auth/auth.module'

@Module({
    imports: [DatabaseModule, UserModule, UserRepositoryModule, LoginModule, AuthModule],
    controllers: [],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: JwtGuard,
        },
    ],
})
export class AppModule {}
