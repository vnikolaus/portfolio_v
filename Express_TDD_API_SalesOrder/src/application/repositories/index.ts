import { DB } from '../../infra/database/db'
import { ClientRepository } from './ClientRepository'
import { ProductRepository } from './ProductRepository'
import { SalesOrderRepository } from './SalesOrderRepository'

const db = new DB()

const salesOrderRepository = new SalesOrderRepository(db)
const clientRepository = new ClientRepository(db)
const productRepository = new ProductRepository(db)

export { salesOrderRepository, clientRepository, productRepository }
