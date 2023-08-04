import { Body, Controller, Get, Param, Post, Request, Put, Delete, UseGuards } from '@nestjs/common'
import { Product } from 'src/entities/product.entity'
import { AuthRequest } from '../auth/typings/interfaces'
import { SigService } from './sig.service'
import { HoldingGuard } from '../auth/guards/holding.guard'
import { IsHolding } from '../auth/decorators/isHolding.decorator'
import { Sig } from 'src/entities/sig.entity'

@Controller('sig')
@UseGuards(HoldingGuard)
export class SigController {
    constructor(private readonly sigService: SigService) {}

    @IsHolding()
    @Get()
    async list() {
        const sigs = await this.sigService.findAll()
        return sigs
    }

    @IsHolding()
    @Get('/:id')
    async getSig(@Param() id: number) {
        const sig = await this.sigService.findSig(id)
        return sig
    }

    @IsHolding()
    @Post('/add')
    async addSig(@Request() req: AuthRequest) {
        const { user } = req
        const newSig = await this.sigService.createSig(user)
        return newSig
    }

    @IsHolding()
    @Put('/:id/add/products')
    async addProducts(@Param() id: number, @Body() products: Product[]) {
        let sig: Sig = null

        for (const i in products) {
            sig = await this.sigService.addProducts(id, products[i])
        }

        return sig
    }

    @IsHolding()
    @Delete('/:idSig/remove/:idProduct')
    async removeProducts(@Param() ids: number) {
        const data = Object.values(ids)
        const idSig = data[0]
        const idProd = data[1]

        const result = await this.sigService.removeProducts(idSig, idProd)
        return result
    }
}
