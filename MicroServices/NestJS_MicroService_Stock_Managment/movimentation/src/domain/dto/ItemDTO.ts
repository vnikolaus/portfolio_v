import { Injectable } from '@nestjs/common'
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

@Injectable()
export class ItemDTO {
    @IsString()
    @IsNotEmpty()
    @Length(6)
    code: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    qty: number
}
