import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { LoginMiddleware } from '../../middlewares/LoginMiddleware'
import { CreationMiddleware } from 'src/app/middlewares/CreationMiddleware'

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.TOKEN_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginMiddleware).forRoutes('login')
        consumer.apply(CreationMiddleware).forRoutes('user/create')
    }
}
