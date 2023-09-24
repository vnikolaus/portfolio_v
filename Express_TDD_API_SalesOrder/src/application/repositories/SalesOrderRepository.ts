import { SalesOrder } from '../../domain/entities/SalesOrder'
import { DB } from '../../infra/database/db'

interface RepoSO {
    list(): Promise<SalesOrder[]>
    find(id: string): Promise<SalesOrder>
    add(salesOrder: SalesOrder): Promise<SalesOrder>
    remove(id: string): Promise<void>
}

export class SalesOrderRepository implements RepoSO {
    private readonly db: DB

    constructor(database: DB) {
        this.db = database
    }

    async list() {
        return await this.db.list('orders')
    }

    async find(id: string) {
        return await this.db.get('orders', id)
    }

    async add(salesOrder: SalesOrder) {
        const newSO = new SalesOrder(salesOrder)
        await this.db.insert<SalesOrder>('orders', newSO.props)
        return newSO
    }

    async remove(id: string) {
        await this.db.delete('orders', id)
    }
}
