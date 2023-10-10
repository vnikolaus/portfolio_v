import { Injectable } from '@nestjs/common'
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { Product } from '../../../entities/product.entity'

@Injectable()
export class ProductDTO extends Product {
    @IsString()
    @MaxLength(60)
    name: string

    @IsString()
    @MaxLength(25)
    code: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    storage: number
}
