import { Controller, Get } from '@nestjs/common'
import { KeyNeeded } from 'src/auth/decorators/key.decorator'
import { ProdutosService } from './Produtos.service'

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly service: ProdutosService) {}

    @Get('/:key')
    @KeyNeeded()
    async list() {
        const produtos = await this.service.listProdutos()
        return produtos
    }
}
