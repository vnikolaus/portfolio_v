import { Transaction } from '../../domain/entities/Transaction';
import { Queue } from '../../infra/queue/Queue';
import { Registry } from '../../infra/registry/Registry';
import { AccounRepository } from '../repositories/AccountRepository';
import { ApproveTransaction } from './ApproveTransaction';
import { RejectTransaction } from './RejectTransaction';
import { UpdateBalance } from './UpdateBalance';


export class ValidatesOperation {
    private queue: Queue

    constructor(readonly registry: Registry) {
        this.queue = registry.inject('queue')
    }

    async execute(transaction: Transaction) {
        const { from: accFrom, to: accTo } = transaction

        if (transaction.amount > accFrom.balance || accFrom.number === accTo.number || accFrom.agency === accTo.agency) {
            const rejectedTransaction = new RejectTransaction(this.registry)
            await rejectedTransaction.execute(transaction)
            return
        }

        const updateBalance = new UpdateBalance(this.registry)
        await updateBalance.execute(transaction)
    }
}
