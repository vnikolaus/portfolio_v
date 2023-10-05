import { AccounRepository } from '../../application/repositories/AccountRepository'
import { Account } from '../../domain/entities/Account'
import { Registry } from '../registry/Registry'

export class AccountRepositoryDatabase implements AccounRepository {
    private model: unknown

    constructor(readonly registry: Registry) {
        this.model = registry.inject('accountModel')
    }

    async get(number: string, agency: string) {
        const account = await this.model.findOne({ number, agency }, 'number agency balance token pwd')
        return Account.restore({
            number: account.number,
            agency: account.agency,
            balance: account.balance,
            token: account.token,
            pwd: account.pwd,
        })
    }

    async save(account: Account): Promise<void> {
        await this.model.create(account)
    }
}
