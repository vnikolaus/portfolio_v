import { Account } from "../../domain/entities/Account";
import { Registry } from "../../infra/registry/Registry";
import { AccounRepository } from "../repositories/AccountRepository";
import { ApproveTransaction } from "./ApproveTransaction";

export class UpdateBalance {
    private accountRepository: AccounRepository

    constructor(readonly registry: Registry) {
        this.accountRepository = registry.inject('accountRepository')
    } 

    async execute(transaction: Transaction) {
        const { balance: fromBalance, ...restFrom } = transaction.from
        const { balance: toBalance, ...restTo } = transaction.to

        const accFrom = new Account({
            ...restFrom,
            balance: fromBalance - transaction.amount
        })
        
        const accTo = new Account({
            ...restTo,
            balance: toBalance + transaction.amount
        })

        await this.accountRepository.update(accFrom)
        await this.accountRepository.update(accTo)

        const approveTransaction = new ApproveTransaction(this.registry)
        await approveTransaction.execute(transaction, accFrom, accTo)
    }
}