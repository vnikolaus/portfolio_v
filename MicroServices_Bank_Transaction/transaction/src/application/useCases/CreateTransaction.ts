import { Account } from '../../domain/entities/Account'
import { Transaction } from '../../domain/entities/Transaction'
import { Queue } from '../../infra/queue/Queue'
import { Registry } from '../../infra/registry/Registry'

export class CreateTransaction {
    private accountRepository: unknown
    private transactionRepository: unknown
    private queue: Queue

    constructor(readonly registry: Registry) {
        this.accountRepository = registry.inject('accountRepository')
        this.transactionRepository = registry.inject('transactionRepository')
        this.queue = registry.inject('queue')
    }

    async execute(input: Input) {
        const { from, to, amount } = input

        const fromAccount = await this.accountRepository.get(from.acc, from.agency)
        const toAccount = await this.accountRepository.get(to.acc, to.agency)

        const transaction = new Transaction({
            from: fromAccount,
            to: toAccount,
            amount,
        })

        await this.transactionRepository.save(transaction)

        await this.queue.publish('newTransaction', transaction)

        return {
            transaction_id: transaction.id,
            status: transaction.status,
        }
    }
}

type Input = {
    from: Account
    to: Account
    amount: number
}
