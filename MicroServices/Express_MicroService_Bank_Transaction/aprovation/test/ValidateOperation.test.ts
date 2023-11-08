import { describe, expect, test } from 'vitest'
import { ValidatesOperation } from '../src/application/useCases/ValidatesOperation'
import { registry } from '../src/infra/registry'

describe('Validate operation - Test' , () => {
    test.skip('should validate the bank transaction', async () => {
        const transaction = {
            id: 'fb4c8263-67fc-47ef-93c2-793decf5cb02',
            from: {
              number: '1',
              agency: '1',
              balance: 100,
              token: 'fake-token-vitest',
              pwd: 'fake-pwd-vitest'
            },
            to: {
              number: '2',
              agency: '2',
              balance: 100,
              token: 'fake-token-vitest',
              pwd: 'fake-pwd-vitest'
            },
            amount: 50,
            status: 'pending'
        }
      
        const approval = new ValidatesOperation(registry)
        expect(await approval.execute(transaction)).not.toReturn()
    })
})