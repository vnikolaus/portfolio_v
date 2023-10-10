import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDTO } from './dto/user.dto'
import { User } from 'src/entities/user.entity'
import { IsAdmin } from '../auth/decorators/isAdmin.decorator'
import { Cell } from 'src/entities/cell.entity'

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @IsAdmin()
    @Get('/:id')
    async getUser(@Param('id') id: number): Promise<User> {
        const user = await this.userService.findUser({ id: id })

        return {
            ...user,
            password: undefined,
            updated_at: undefined,
        }
    }

    @IsAdmin()
    @Post('/create')
    async create(@Body() user: UserDTO): Promise<User> {
        const newUser = await this.userService.create(user)
        return newUser
    }

    @IsAdmin()
    @HttpCode(HttpStatus.OK)
    @Post('/:id/cells')
    async cells(@Param() id: number): Promise<Cell[]> {
        const cells = await this.userService.listCellsByPk(id)
        return cells
    }
}
