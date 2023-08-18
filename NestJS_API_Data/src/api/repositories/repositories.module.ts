import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/db.module'
import { GrupoAssuntoRepository } from './implementations/GrupoProduto.repository'
import { VeiculosRepository } from './implementations/Veiculos.repository'
import { ProdutosRepository } from './implementations/Produtos.repository'

@Module({
    imports: [DatabaseModule],
    providers: [GrupoAssuntoRepository, VeiculosRepository, ProdutosRepository],
    exports: [GrupoAssuntoRepository, VeiculosRepository, ProdutosRepository],
})
export class RepositoriesModule {}
