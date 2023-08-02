import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './useCases/auth/auth.module'
import { JwtAuthGuard } from './useCases/auth/guards/jwt.guard'
import { CellModule } from './useCases/cell/cell.module'
import { ProductModule } from './useCases/product/product.module'
import { SigModule } from './useCases/sig/sig.module'
import { UserModule } from './useCases/user/user.module'

@Module({
    imports: [AuthModule, UserModule, CellModule, ProductModule, SigModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
