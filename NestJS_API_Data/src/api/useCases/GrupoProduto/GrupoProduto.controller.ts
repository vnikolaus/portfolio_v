import { Controller, Get } from '@nestjs/common'
import { KeyNeeded } from 'src/auth/decorators/key.decorator'
import { GrupoProdutoService } from './GrupoProduto.service'

@Controller('gp-produto')
export class GrupoProdutoController {
    constructor(private readonly service: GrupoProdutoService) {}

    @Get('/:key')
    @KeyNeeded()
    async list() {
        const grupoProdutos = await this.service.listGrupoProduto()
        return grupoProdutos
    }
}
