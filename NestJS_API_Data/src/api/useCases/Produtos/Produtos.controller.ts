import { Controller, Get } from '@nestjs/common'
import { ProdutosRepository } from 'src/api/repositories/implementations/Produtos.repository'
import { KeyNeeded } from 'src/auth/decorators/key.decorator'

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly repository: ProdutosRepository) {}

    @Get('/:key')
    @KeyNeeded()
    async list() {
        const produtos = await this.repository.listProdutos()
        return produtos
    }
}
