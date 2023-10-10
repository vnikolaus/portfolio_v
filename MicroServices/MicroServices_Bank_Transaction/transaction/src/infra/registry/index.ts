import { CloseApprovedTransaction } from '../../application/useCases/CloseApprovedTransaction'
import { CloseRejectedTransaction } from '../../application/useCases/CloseRejectedTransaction'
import { conn as DatabaseConnection } from '../database/connection'
import { AccountModel } from '../database/schemas/AccountSchema'
import { TransactionModel } from '../database/schemas/TransactionSchema'
import { QueueController } from '../queue/QueueController'
import { RabbitMQService } from '../queue/service/RabbitMQService'
import { AccountRepositoryDatabase } from '../repository/AccountRepositoryDatabase'
import { TransactionRepositoryDatabase } from '../repository/TransactionRepositoryDatabase'
import { Registry } from './Registry'

const registry = new Registry()

async function main() {
    await DatabaseConnection()

    const queue = new RabbitMQService()
    await queue.connect()
    registry.provide('queue', queue)

    registry.provide('accountModel', AccountModel)
    registry.provide('transactionModel', TransactionModel)

    registry.provide('transactionRepository', new TransactionRepositoryDatabase(registry))
    registry.provide('accountRepository', new AccountRepositoryDatabase(registry))
    registry.provide('closeApprovedTransaction', new CloseApprovedTransaction(registry))
    registry.provide('closeRejectedTransaction', new CloseRejectedTransaction(registry))
    new QueueController(registry)
}

await main()

export { registry }
