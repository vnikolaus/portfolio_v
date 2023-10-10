import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { User } from 'src/domain/User'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() users: User[]) {
        const newUsers: User[] = []

        for (const user of users) {
            const newUser = await this.userService.createUser(user)
            newUsers.push(newUser)
        }

        return newUsers
    }

    @Get()
    async findAll() {
        return await this.userService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findByPk(id)
    }

    @Patch()
    async update(@Body() user: Partial<User>) {
        return await this.userService.updateUser(user)
    }

    @Patch(':id')
    async updateEmail(@Param('id') id: string, @Body() email: string) {
        return await this.userService.changeEmail({ id, email })
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.removeUser(id)
    }

    @Post('/validation')
    @HttpCode(HttpStatus.OK)
    async validCpf() {
        return await this.userService.checkCpf()
    }
}
