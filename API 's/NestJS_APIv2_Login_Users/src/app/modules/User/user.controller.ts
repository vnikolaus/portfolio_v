import { Controller, Post, Get, Body, UnauthorizedException } from '@nestjs/common'
import { UserProps } from '../../../domain/User'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
