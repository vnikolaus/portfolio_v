import { Injectable } from '@nestjs/common'
import { GrupoAssuntoRepository } from '../../repositories/implementations/GrupoProduto.repository'

@Injectable()
export class GrupoProdutoService {
    constructor(private readonly repository: GrupoAssuntoRepository) {}

    async listGrupoProduto() {
        const grupoProdutos = await this.repository.list()
        return grupoProdutos
    }
}
