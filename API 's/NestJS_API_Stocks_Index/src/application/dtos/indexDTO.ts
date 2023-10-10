import { Injectable } from '@nestjs/common'
import { IsNotEmpty, Length, IsNumber } from 'class-validator'

@Injectable()
export abstract class IndexDTO {
    @IsNotEmpty()
    @Length(4, 6)
    symbol: string

    @IsNumber()
    openPrice: number

    @IsNotEmpty()
    @IsNumber()
    currentPrice: number

    @IsNumber()
    variation: number
}
