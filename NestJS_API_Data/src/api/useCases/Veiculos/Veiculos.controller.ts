import { Controller, Get } from '@nestjs/common'
import { VeiculosRepository } from 'src/api/repositories/implementations/Veiculos.repository'
import { KeyNeeded } from 'src/auth/decorators/key.decorator'

@Controller('veiculos')
export class VeiculosController {
    constructor(private readonly repository: VeiculosRepository) {}

    @Get('/:key')
    @KeyNeeded()
    async list() {
        const veiculos = await this.repository.listVeiculos()
        return veiculos
    }
}
