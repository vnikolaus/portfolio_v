import { LOGIN, PWD } from '../constants/user.constants'
import { MockError } from '../useCases/auth/errors/errors'
import { LoginMiddlewareMock } from './mocks/login.middlewareMock'

describe(`Login Validation - Test's `, () => {
    it(`Should throw a error`, async () => {
        const loginMock = new LoginMiddlewareMock()
        expect(loginMock.login(LOGIN, +PWD)).rejects.toThrowError(MockError)
    })

    it(`Should login user`, async () => {
        const loginMock = new LoginMiddlewareMock()
        expect(loginMock.login(LOGIN, PWD)).resolves.not.toThrowError(MockError)
    })
})
