import { Entity } from '../core/Entity'
import { Client } from './Client'
import { Product } from './Product'

type SalesOrderType = {
    client: Client
    products: Product | Product[]
    quantity: number
    dispatch?: number
    total?: number
    startedAt?: Date
}

export class SalesOrder extends Entity<SalesOrderType> {
    constructor(readonly salesOrder: SalesOrderType) {
        super(salesOrder)
    }
}
