import { Test } from '@nestjs/testing'
import { LoginService } from '../../src/app/modules/login/login.service'
import { randomUUID as uuid } from 'crypto'

describe('UserService - Test', () => {
    let loginService: LoginService

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            providers: [
                {
                    provide: LoginService,
                    useValue: {
                        loginUser: jest.fn().mockResolvedValue(uuid()),
                    },
                },
            ],
        }).compile()

        loginService = testModule.get<LoginService>(LoginService)
    })

    it('Modules should be defined', () => {
        expect(loginService).toBeDefined()
    })

    it('should return a user token if succedded login', async () => {
        const input = { email: 'jonh@doe.io', pwd: 'johndoe' }
        const token = await loginService.loginUser(input)
        expect(token).toBeDefined()
        expect(typeof token).toBe('string')
    })
})
