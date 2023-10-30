import { Test } from '@nestjs/testing'
import { UserService } from '../../src/app/modules/User/user.service'
import { UserController } from '../../src/app/modules/User/user.controller'
import { userMock } from './mocks/UserMock'

describe('UserController - Test', () => {
    let userController: UserController
    let userService: UserService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
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

        userController = module.get<UserController>(UserController)
        userService = module.get<UserService>(UserService)
    })

    it('Modules should be defined', async () => {
        expect(userController).toBeDefined()
        expect(userService).toBeDefined()
    })

    it('should create a new user', async () => {
        const user = { email: 'fake@email.com', pwd: 'fakepwd' }
        const newUser = await userController.create(user)
        expect(newUser.id).toBeDefined()
        expect(newUser.createdAt).toStrictEqual(new Date('2023-05-06T12:00:00-03:00'))
    })

    it('should list users', async () => {
        const users = await userController.list()
        const objUser = userMock
        Reflect.deleteProperty(objUser, 'pwd')
        expect(users.length).toBeGreaterThanOrEqual(1)
        expect(users[0].id).toEqual(objUser._id)
    })
})
