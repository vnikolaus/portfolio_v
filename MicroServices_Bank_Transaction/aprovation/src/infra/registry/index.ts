import { conn } from '../../../../transaction/src/infra/database/connection'
import { AccountModel } from '../../../../transaction/src/infra/database/schemas/AccountSchema'
import { TransactionModel } from '../../../../transaction/src/infra/database/schemas/TransactionSchema'
import { TransactionApproval } from '../../application/useCases/TransactionApproval'
import { QueueController } from '../queue/QueueController'
import { RabbitMQService } from '../queue/service/RabbitMQService'
import { AccountRepositoryDatabase } from '../repository/AccountRepositoryDatabase'
import { Registry } from './Registry'

const registry = new Registry()

async function main() {
    await conn()

    const queue = new RabbitMQService()
    await queue.connect()

    registry.provide('accountModel', AccountModel)
    registry.provide('transactionModel', TransactionModel)

    registry.provide('accountRepository', new AccountRepositoryDatabase(registry))
    registry.provide('transactionApproval', new TransactionApproval(registry))
    registry.provide('queue', queue)
    new TransactionApproval(registry)
    new QueueController(registry)
}

await main()

export { registry }
