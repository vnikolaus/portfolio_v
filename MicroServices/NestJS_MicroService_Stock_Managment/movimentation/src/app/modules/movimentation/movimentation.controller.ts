import { Controller, Get, Param } from '@nestjs/common'
import { MovimentationService } from './movimentation.service'

@Controller('movimentation')
export class MovimentationController {
    constructor(private readonly movimentationService: MovimentationService) {}

    @Get('/:id')
    async getMovimentation(@Param() param: { id: string }) {
        const { id } = param
        const movimentation = await this.movimentationService.findOne(id)
        return movimentation
    }
}
