import { Module } from '@nestjs/common'
import { GrupoProdutoController } from './GrupoProduto/GrupoProduto.controller'
import { RepositoriesModule } from '../repositories/repositories.module'
import { VeiculosController } from './Veiculos/Veiculos.controller'
import { ProdutosController } from './Produtos/Produtos.controller'

@Module({
    imports: [RepositoriesModule],
    controllers: [GrupoProdutoController, VeiculosController, ProdutosController],
})
export class CasesModule {}
