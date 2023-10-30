import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { UserModule } from '../User/user.module'
import { config as dotenv } from 'dotenv'
dotenv()

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.TOKEN_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService],
})
export class LoginModule {}
