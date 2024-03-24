import { Item } from './Item'
import { randomUUID as uuid } from 'crypto'
import { MovimentationDTO } from './dto/MovimentationDTO'

export class Movimentation {
    readonly id: string
    readonly item: Item
    readonly quantity: Item['qty']
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly status: string

    private constructor(props: MovimentationDTO) {
        Object.assign(this, props)
    }

    static create(item: MovimentationDTO['item']): Movimentation {
        const initialStatus = 'processing'
        return new Movimentation({
            id: uuid(),
            item,
            quantity: item.qty,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: initialStatus,
        })
    }
}
