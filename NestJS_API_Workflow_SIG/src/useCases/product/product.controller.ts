import { Body, Controller, HttpCode, HttpStatus, Param, Post, Get, Put, Delete, UseGuards } from '@nestjs/common'
import { ProductDTO } from './dto/product.dto'
import { ProductService } from './product.service'
import { DeptoCompras } from '../auth/decorators/deptoCompras.decorator'
import { ComprasGuard } from '../auth/guards/compras.guard'
import { Product } from '../../entities/product.entity'

@Controller('product')
@UseGuards(ComprasGuard)
export class ProductController {
    constructor(private readonly prodService: ProductService) {}

    @Get()
    async list(): Promise<Product[]> {
        const products = await this.prodService.findAll()
        return products
    }

    @Post('/add')
    @DeptoCompras()
    async add(@Body() product: ProductDTO) {
        const newProduct = await this.prodService.insert(product)
        return newProduct
    }

    @Put('/update/:id')
    @DeptoCompras()
    async update(@Param() id: number, @Body() product: ProductDTO) {
        const updatedProduct = await this.prodService.update(id, product)
        return updatedProduct
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    @DeptoCompras()
    async remove(@Param() id: number) {
        const result = await this.prodService.delete(id)
        return result
    }
}
