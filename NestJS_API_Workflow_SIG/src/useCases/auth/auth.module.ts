import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { LoginMiddleware } from '../../middlewares/login.middleware'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './guards/strategies/jwt.strategy'
import { LocalStrategy } from './guards/strategies/local.strategy'
import { EXPIRATION, SECRET } from '../../constants/token.constants'

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: SECRET,
            signOptions: { expiresIn: EXPIRATION },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginMiddleware).forRoutes('login')
    }
}
