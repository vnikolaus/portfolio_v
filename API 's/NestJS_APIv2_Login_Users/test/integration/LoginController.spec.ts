import { Test } from '@nestjs/testing'
import { LoginController } from '../../src/app/modules/login/login.controller'
import { LoginService } from '../../src/app/modules/login/login.service'
import { randomUUID as uuid } from 'crypto'

describe('LoginController - Test', () => {
    let loginController: LoginController
    let loginService: LoginService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                {
                    provide: LoginService,
                    useValue: {
                        loginUser: jest.fn().mockResolvedValue(uuid()),
                    },
                },
            ],
        }).compile()

        loginController = module.get<LoginController>(LoginController)
        loginService = module.get<LoginService>(LoginService)
    })

    it('Modules should be defined', async () => {
        expect(loginController).toBeDefined()
        expect(loginService).toBeDefined()
    })

    it('should make a login if correct email and password', async () => {
        const input = { email: 'jonh@doe.io', pwd: 'johndoe' }
        const login = await loginController.login(input)
        expect(login.user_token).toBeDefined()
        expect(typeof login.user_token).toBe('string')
    })

    it('should throw a error if email is not valid', async () => {
        const input = { email: 'jonh@doe.iox', pwd: 'johndoe' }
        jest.spyOn(loginService, 'loginUser').mockRejectedValueOnce(new Error())
        expect(loginController.login(input)).rejects.toThrowError(Error)
    })

    it('should throw a error if paswword is not valid', async () => {
        const input = { email: 'jonh@doe.io', pwd: 'johndoex' }
        jest.spyOn(loginService, 'loginUser').mockRejectedValueOnce(new Error())
        expect(loginController.login(input)).rejects.toThrowError(Error)
    })
})
