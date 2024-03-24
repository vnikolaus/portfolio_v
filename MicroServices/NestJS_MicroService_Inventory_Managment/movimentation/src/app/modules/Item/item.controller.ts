import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { ItemDTO } from 'src/domain/dto/ItemDTO'
import { ItemService } from './item.service'

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post('/insert')
    async movimentate(@Body() item: ItemDTO) {
        try {
            return await this.itemService.handle(item)
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }
}
