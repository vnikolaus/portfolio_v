import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from '../../entities/product.entity'
import { DatabaseModule } from '../../database/database.module'
import { UserModule } from '../user/user.module'

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Product]), UserModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
