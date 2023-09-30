import { ProcessPayment } from '../../app/useCases/ProcessPayment'
import { connection } from '../db/connection'
import { FakePaymentGateway } from '../gateway/FakePaymentGateway'
import { QueueController } from '../queue/QueueController'
import { RabbitMQAdapter } from '../queue/RabbitMQAdapter'
import { TransactionRepositoryDatabase } from '../repository/TransactionRepositoryDatabase'
import { Registry } from './Registry'

const registry = new Registry()
const queue = new RabbitMQAdapter()

async function main() {
    await queue.connect()

    registry.provide('connection', connection)
    registry.provide('transactionRepository', new TransactionRepositoryDatabase(registry))
    registry.provide('paymentGateway', new FakePaymentGateway())
    registry.provide('queue', queue)
    registry.provide('processPayment', new ProcessPayment(registry))
    new QueueController(registry)
}

main()

export { registry }
