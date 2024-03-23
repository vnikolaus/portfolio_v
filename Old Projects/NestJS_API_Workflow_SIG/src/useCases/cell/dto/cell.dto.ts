import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Cell } from '../../../entities/cell.entity'

export class CellDTO extends Cell {
    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    cell: string

    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    fixedType: string
}
