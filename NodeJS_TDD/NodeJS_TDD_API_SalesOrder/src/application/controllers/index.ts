import { clientRepository, productRepository, salesOrderRepository } from '../repositories'
import { ClientController } from './Client.controller'
import { ProductController } from './Product.controller'
import { SalesOrderController } from './SalesOrder.controller'

const salesOrderController = new SalesOrderController(salesOrderRepository, clientRepository, productRepository)
const clientController = new ClientController(clientRepository)
const productController = new ProductController(productRepository)

export { salesOrderController, clientController, productController }
