import { Module } from '@nestjs/common'
import { GrupoProdutoController } from './GrupoProduto/GrupoProduto.controller'
import { RepositoriesModule } from '../repositories/repositories.module'
import { VeiculosController } from './Veiculos/Veiculos.controller'
import { ProdutosController } from './Produtos/Produtos.controller'
import { GrupoProdutoService } from './GrupoProduto/GrupoProduto.service'
import { ProdutosService } from './Produtos/Produtos.service'
import { VeiculosService } from './Veiculos/Veiculos.service'

@Module({
    imports: [RepositoriesModule],
    controllers: [GrupoProdutoController, VeiculosController, ProdutosController],
    providers: [GrupoProdutoService, ProdutosService, VeiculosService],
})
export class CasesModule {}
