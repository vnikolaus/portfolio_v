import { Email } from '../../src/domain/entities/Email'

describe('Email - Test', () => {
    it('should validate a correct email', () => {
        const validEmail = 'fake@email.com'
        const email = new Email(validEmail)
        expect(email.content).toBeDefined()
    })

    it('should throw a error if email is invalid', () => {
        const invalidEmail1 = 'fake@email.c'
        const invalidEmail2 = 'fake.io'
        expect(() => new Email(invalidEmail1)).toThrowError('Invalid e-mail')
        expect(() => new Email(invalidEmail2)).toThrowError('Invalid e-mail')
    })
})
