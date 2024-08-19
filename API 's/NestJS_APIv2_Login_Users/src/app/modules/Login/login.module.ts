import { Module } from '@nestjs/common'
import { config as dotenv } from 'dotenv'
import { UserModule } from '../User/user.module'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
dotenv()

@Module({
    imports: [UserModule],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService],
})
export class LoginModule {}
