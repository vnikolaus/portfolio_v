import { Injectable } from '@nestjs/common'
import { User } from '../../../entities/user.entity'
import { IsString, MaxLength, MinLength } from 'class-validator'

@Injectable()
export class UserDTO extends User {
    @IsString()
    name: string

    @IsString()
    @MaxLength(25)
    login: string

    @IsString()
    @MinLength(5)
    password: string
}
