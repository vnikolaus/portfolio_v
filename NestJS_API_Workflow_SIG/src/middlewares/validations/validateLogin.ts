import { IsNotEmpty, IsString } from 'class-validator'

export class ValidateLogin {
    @IsString()
    @IsNotEmpty()
    login: string

    @IsString()
    @IsNotEmpty()
    password: string
}
