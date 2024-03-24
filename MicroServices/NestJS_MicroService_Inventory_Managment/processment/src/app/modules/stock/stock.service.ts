import { Injectable } from '@nestjs/common'
import { Movimentation } from '../../../domain/Movimentation'
import { StockRepository } from '../../../infra/repositories/StockRepository'
import { MovimentationRepository } from '../../../infra/repositories/MovimentationRepository'

@Injectable()
export class StockService {
    constructor(
        private readonly stockRepository: StockRepository,
        private readonly movRepository: MovimentationRepository,
    ) {}

    async exec(movimentation: Movimentation) {
        const { code, name, qty } = movimentation.item
        const [registeredItem] = await this.stockRepository.findByCode(code)
        if (!registeredItem || name !== registeredItem.itemname) {
            movimentation.reject('Invalid item.')
            await this.movRepository.save(movimentation)
            return
        }
        const newStock = qty + +registeredItem.quantity
        movimentation.approve()
        await this.stockRepository.updateStock(code, newStock)
        await this.movRepository.save(movimentation)
    }
}
