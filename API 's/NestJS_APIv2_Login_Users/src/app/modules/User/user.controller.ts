import { Body, Controller, Get, Post, Request as Req, UnauthorizedException } from '@nestjs/common'
import { UserProps } from '../../../domain/entities/User'
import { IsPublic } from '../Auth/guard/JwtGuard'
import { UserService } from './user.service'
import { Request } from 'express'

interface UserRequest extends Request {
    user: {
        email: string
        date: number
    }
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    async getMe(@Req() req: UserRequest) {
        const { email, date } = req.user
        try {
            return {
                user_email: email,
                created_at: new Date(date).toISOString(),
                actual_timestamp: +new Date(),
            }
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }

    @Get('/list')
    async list() {
        try {
            const rawData = await this.userService.list()
            const users = rawData.map((el) => {
                return {
                    id: el._id,
                    email: el.email,
                    createdAt: el.createdAt,
                    updatedAt: el.updatedAt,
                }
            })
            return users
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }

    @IsPublic()
    @Post('/create')
    async create(@Body() input: UserProps) {
        try {
            const createdUser = await this.userService.add(input)
            return {
                id: createdUser._id,
                email: createdUser.email,
                createdAt: createdUser.createdAt,
                updatedAt: createdUser.updatedAt,
            }
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }
}
