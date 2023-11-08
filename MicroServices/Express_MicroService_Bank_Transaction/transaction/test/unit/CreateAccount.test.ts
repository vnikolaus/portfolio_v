import { describe, test, expect } from 'vitest'
import { Account } from '../../src/domain/entities/Account'
import { Password } from '../../src/domain/entities/Password'
import { Token } from '../../src/domain/entities/Token'

describe('Create Account - Test', () => {
    test('should be create a new account', async () => {
        const input = {
            number: '0',
            agency: '0',
            pwd: 'fake-vitest'
        }
        
        const account = await Account.create(input)
        const hashPwd = new Password(input.pwd)

        expect(account).toHaveProperty('token')
        expect(account.balance).toBe(0)
        expect(hashPwd.content).toStrictEqual(account.pwd)
    })

    test('should be restore a account from database', async () => {
        const input = {
            number: '0',
            agency: '0',
            pwd: 'fake-vitest'
        }
        
        const account = await Account.create(input)
        const restoreAccount = Account.restore(account)
        
        expect(restoreAccount).toStrictEqual(account)
    })
})