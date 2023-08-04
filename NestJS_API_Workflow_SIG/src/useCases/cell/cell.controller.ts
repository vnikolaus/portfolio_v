import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Delete } from '@nestjs/common'
import { Cell } from 'src/entities/cell.entity'
import { CellService } from './cell.service'
import { CellDTO } from './dto/cell.dto'
import { IsAdmin } from '../auth/decorators/isAdmin.decorator'
import { AddMemberProps } from './typings/types'

@Controller('cell')
export class CellController {
    constructor(private cellService: CellService) {}

    @IsAdmin()
    @Post('/create')
    async create(@Body() cell: CellDTO): Promise<Cell> {
        const newCell = await this.cellService.create(cell)

        return newCell
    }

    @IsAdmin()
    @Get('/list')
    async list(): Promise<Cell[]> {
        return this.cellService.listCells()
    }

    @IsAdmin()
    @Put('/add')
    async addMember(@Body() member: AddMemberProps): Promise<void> {
        await this.cellService.addMember(member)
    }

    @HttpCode(HttpStatus.OK)
    @IsAdmin()
    @Delete('/remove')
    async removeMember(@Body() member: AddMemberProps): Promise<void> {
        await this.cellService.removeMember(member)
    }

    @HttpCode(HttpStatus.OK)
    @IsAdmin()
    @Post('/:id/members')
    async userCells(@Param() id: number) {
        const list = await this.cellService.listCellMembers(id)
        return list
    }
}
