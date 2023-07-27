import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { UserModule } from './useCases/user/user.module';
import { AuthModule } from './useCases/auth/auth.module';
import { AppService } from './app.service';
import { JwtAuthGuard } from './useCases/auth/guards/jwt.authguard';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }],
})

export class AppModule {}
