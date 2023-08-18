import { Injectable } from '@nestjs/common'
import { ProdutosRepository } from 'src/api/repositories/implementations/Produtos.repository'

@Injectable()
export class ProdutosService {
    constructor(private readonly repository: ProdutosRepository) {}

    async listProdutos() {
        const produtos = await this.repository.list()
        return produtos
    }
}
