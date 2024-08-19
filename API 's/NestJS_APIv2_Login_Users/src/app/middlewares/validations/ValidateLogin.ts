import { IsNotEmpty, IsString } from 'class-validator'

export class ValidateLogin {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    pwd: string
}
