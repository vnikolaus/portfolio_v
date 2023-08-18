import { Controller, Get } from '@nestjs/common'
import { KeyNeeded } from 'src/auth/decorators/key.decorator'
import { VeiculosService } from './Veiculos.service'

@Controller('veiculos')
export class VeiculosController {
    constructor(private readonly service: VeiculosService) {}

    @Get('/:key')
    @KeyNeeded()
    async list() {
        const veiculos = await this.service.listVeiculos()
        return veiculos
    }
}
