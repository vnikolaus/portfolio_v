import { Test } from '@nestjs/testing'
import { UserService } from '../../src/app/modules/User/user.service'
import { userMock } from './mocks/UserMock'

describe('UserService - Test', () => {
    let userService: UserService

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        add: jest.fn().mockResolvedValue(userMock),
                        list: jest.fn().mockResolvedValue([userMock]),
                    },
                },
            ],
        }).compile()

        userService = testModule.get<UserService>(UserService)
    })

    it('Modules should be defined', () => {
        expect(userService).toBeDefined()
    })

    it('should add a new user', async () => {
        const user = { email: 'fake@email.com', pwd: 'fakepwd' }
        const newUser = await userService.add(user)
        expect(newUser._id).toBeDefined()
        expect(newUser).toStrictEqual(userMock)
    })

    it('should list users', async () => {
        const users = await userService.list()
        expect(users.length).toBeGreaterThanOrEqual(1)
        expect(users).toStrictEqual([userMock])
    })
})
