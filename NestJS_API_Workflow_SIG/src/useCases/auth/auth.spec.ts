import { Test } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { mockRequest, tokenMock } from './mocks/AuthMocks'
import * as USER from '../../constants/user.constants'
import { MockError } from './errors/errors'

describe(`Test's Cell - UseCase`, () => {
    let authController: AuthController
    let authService: AuthService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn().mockReturnValue(tokenMock),
                        validateUser: jest.fn().mockReturnValue(mockRequest.user),
                    },
                },
            ],
        }).compile()

        authController = module.get<AuthController>(AuthController)
        authService = module.get<AuthService>(AuthService)
    })

    it('should be defined', async () => {
        expect(authController).toBeDefined()
        expect(authService).toBeDefined()
    })

    describe('login', () => {
        it(`Should return a access token from user`, async () => {
            const loginToken = await authController.login(mockRequest)

            const spy = jest.spyOn(authService, 'login')

            expect(loginToken).toEqual(tokenMock)
            expect(typeof loginToken).toBe('object')
            expect(typeof loginToken.accessToken).toBe('string')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe('validateUser', () => {
        it(`Should throw a error if password doesnt match`, async () => {
            const spy = jest.spyOn(authService, 'validateUser').mockRejectedValueOnce(new MockError())

            expect(authService.validateUser(USER.LOGIN, USER.PWD)).rejects.toThrowError(MockError)
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })
})
