import { Test } from '@nestjs/testing'
import { TEST_EMAIL, TEST_ID, TEST_NAME } from '../../constants/user.constants'
import { userMock } from './mocks/user.mocks'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe(`Test's User - UseCase`, () => {
    let userController: UserController
    let userService: UserService

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        createUser: jest.fn().mockReturnValue(userMock),
                        findAll: jest.fn().mockReturnValue([userMock]),
                        findByPk: jest.fn().mockReturnValue(userMock),
                        updateUser: jest.fn().mockReturnValue(userMock),
                        removeUser: jest.fn().mockReturnValue(userMock),
                    },
                },
            ],
        }).compile()

        userController = testModule.get<UserController>(UserController)
        userService = testModule.get<UserService>(UserService)
    })

    it('Module should be defined', () => {
        expect(userController).toBeDefined()
        expect(userService).toBeDefined()
    })

    describe('User Controller', () => {
        it(`Should create a new user`, async () => {
            const [newUser] = await userController.create([userMock])

            expect(newUser).toEqual(userMock)
            expect(newUser['email']).not.toBeNull
        })

        it(`Should list all users`, async () => {
            const users = await userController.findAll()

            expect(users).toEqual([userMock])
        })

        it(`Should return a single user`, async () => {
            const user = await userController.findOne(TEST_ID)

            expect(user).toEqual(userMock)
        })

        it(`Should update user`, async () => {
            const user = await userController.update({ email: TEST_EMAIL, nome: TEST_NAME })

            expect(user).toEqual(userMock)
        })

        it(`Should delete a user`, async () => {
            const deletedUser = await userController.remove(TEST_ID)

            expect(deletedUser).toEqual(userMock)
        })
    })
})
