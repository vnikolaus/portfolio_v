import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";
import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserDto extends User {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;
}
