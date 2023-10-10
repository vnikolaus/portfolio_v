import { Request, Response } from 'express'
import { SalesOrderRepository } from '../repositories/SalesOrderRepository'
import { ClientRepository } from '../repositories/ClientRepository'
import { ProductRepository } from '../repositories/ProductRepository'
import { Product } from '../../domain/entities/Product'
import { SalesOrder } from '../../domain/entities/SalesOrder'
import { StartSalesOrder } from '../useCases/StartSalesOrder'
import { salesOrderRepository } from '../repositories'

export class SalesOrderController {
    constructor(
        private repository: SalesOrderRepository,
        private clientRepository: ClientRepository,
        private productRepository: ProductRepository
    ) {}

    async list(req: Request, res: Response) {
        const orders = await this.repository.list()
        return res.json({ orders })
    }

    async find(req: Request, res: Response) {
        const { id } = req.params
        const order = await this.repository.find(id)
        return res.json({ order })
    }

    async add(req: Request, res: Response) {
        try {
            const { client, products, quantity } = req.body

            const _client = await this.clientRepository.findByCode(client.code)

            const _products: Product[] = []
            for (const prod of products) {
                const p = await this.productRepository.findByCode(prod.code)

                _products.push({
                    ...p,
                    stock: p.stock - quantity,
                })
            }

            const salesOrder: SalesOrder = {
                client: _client,
                products: _products,
                quantity,
            }

            const startSaleOrder = new StartSalesOrder(salesOrderRepository)
            const { props: newOrder } = await startSaleOrder.execute(salesOrder)

            return res.status(201).json({ newOrder })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params
        await this.repository.remove(id)
        return res.status(204).json({ removed_id: id })
    }
}
