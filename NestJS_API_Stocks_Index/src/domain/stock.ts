import { StocksDTO } from '../application/dtos/stocksDTO'
import { Entity } from '../core/domain/Entity'

export class Stock extends Entity<StocksDTO> {
    private constructor(props: StocksDTO, id?: string) {
        super(props, id)
    }

    static instance(props: StocksDTO, id?: string) {
        const stock = new Stock(props, id)
        return stock
    }
}
