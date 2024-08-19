import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class ValidateCreation {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    pwd: string
}
