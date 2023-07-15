import { test, expect, it } from 'vitest'
import { User } from '../../entities/User'
import { SHA1 } from 'crypto-js'

const user = new User({ name: 'Vitest', email: 'vitest@test.com', password: 'test' })

it('should create a new User', async () => {
    expect(user).toBeInstanceOf(User)
    expect(user.name).toEqual('Vitest')
    expect(user.id).not.toBeNull()
})