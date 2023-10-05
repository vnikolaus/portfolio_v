import { Transaction } from '../../domain/entities/Transaction'
import { registry } from '../../infra/registry'
import { Registry } from '../../infra/registry/Registry'
import { ValidatesOperation } from './ValidatesOperation'

export class TransactionApproval {
    constructor(readonly registry: Registry)
    
    async execute(transaction: Transaction) {        
        const validateOperation = new ValidatesOperation(this.registry)
        await validateOperation.execute(transaction)
    }
}
