import { Account } from '../../domain/entities/Account'

export interface AccounRepository {
    save(account: Account): Promise<void>
    get(acc: string, agency: string): Promise<Account>
    update(acc: Account): Promise<void>
}
