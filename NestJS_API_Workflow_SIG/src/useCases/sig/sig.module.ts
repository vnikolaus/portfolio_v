import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseModule } from '../../database/database.module'
import { Sig } from '../../entities/sig.entity'
import { ProductModule } from '../product/product.module'
import { SigController } from './sig.controller'
import { SigService } from './sig.service'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Sig]), AuthModule, UserModule, ProductModule],
    controllers: [SigController],
    providers: [SigService],
    exports: [SigService],
})
export class SigModule {}
