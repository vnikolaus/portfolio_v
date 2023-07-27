import { config } from 'dotenv'
config()

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './guards/strategies/local.strategy';
import { JwtStrategy } from './guards/strategies/jwt.strategy';
import { LoginValidationMiddleware } from 'src/application/middlewares/LoginValidationMiddleware';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: process.env.EXPIRATION }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login')
  }
}
