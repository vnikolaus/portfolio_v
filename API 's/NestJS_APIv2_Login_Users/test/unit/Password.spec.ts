import { Password } from '../../src/domain/Password'

describe('Password - Test', () => {
    it('should hashed a new password', () => {
        const pwd = 'fakepwd'
        const hashedPwd = new Password(pwd)
        expect(hashedPwd.content).toBeDefined()
        expect(hashedPwd.content.at(0)).toBe('$')
    })
})
