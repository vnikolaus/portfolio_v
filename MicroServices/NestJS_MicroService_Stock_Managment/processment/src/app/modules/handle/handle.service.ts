import { Injectable } from '@nestjs/common'
import { Movimentation } from '../../../domain/Movimentation'
import { StockService } from '../stock/stock.service'

@Injectable()
export class HandleService {
    constructor(private readonly stockService: StockService) {}

    async exec(movimentation: Movimentation) {
        const restoredMovimentation = Movimentation.restore(movimentation)
        await this.stockService.exec(restoredMovimentation)
    }
}
