import { Injectable } from '@nestjs/common'
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ItemDTO } from './ItemDTO'

@Injectable()
export class MovimentationDTO {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    item: ItemDTO

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsDate()
    @IsNotEmpty()
    createdAt: Date

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date

    @IsString()
    @IsNotEmpty()
    status: string
}
