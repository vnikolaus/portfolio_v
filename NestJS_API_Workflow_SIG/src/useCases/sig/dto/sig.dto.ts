import { Injectable } from '@nestjs/common'
import { IsNumber, IsString } from 'class-validator'
import { Product } from 'src/entities/product.entity'
import { Sig } from 'src/entities/sig.entity'

@Injectable()
export class SigDTO extends Sig {
    @IsNumber()
    idSolicitante: number

    @IsString()
    solicitante: string

    products: Product[]
}
