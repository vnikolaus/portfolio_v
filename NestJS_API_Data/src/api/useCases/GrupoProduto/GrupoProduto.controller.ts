import { Controller, Get } from '@nestjs/common'
import { GrupoAssuntoRepository } from '../../repositories/implementations/GrupoProduto.repository'
import { KeyNeeded } from 'src/auth/decorators/key.decorator'

@Controller('gp-produto')
export class GrupoProdutoController {
    constructor(private readonly repository: GrupoAssuntoRepository) {}

    @Get('/:key')
    @KeyNeeded()
    async list() {
        const grupoProdutos = await this.repository.listGrupoProduto()
        return grupoProdutos
    }
}
