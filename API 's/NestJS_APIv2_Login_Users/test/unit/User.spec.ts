import { User } from '../../src/domain/User'

describe('Email - Test', () => {
    it('should create a new user', async () => {
        const user = { email: 'fake@email.com', pwd: 'fakepwd' }
        const newUser = User.create(user)
        expect(newUser.createdAt).toBeDefined()
        expect(newUser.createdAt).toEqual(newUser.updatedAt)
    })
})
