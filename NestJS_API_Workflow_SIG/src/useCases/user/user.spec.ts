import * as CONSTANTS from '../../constants/user.constants'
import * as MOCKS from './mocks/UserMocks'
import { Test } from '@nestjs/testing'
import { UserDTO } from './dto/user.dto'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe(`Test's User - UseCase`, () => {
    let userController: UserController
    let userService: UserService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(MOCKS.userMock),
                        findUser: jest.fn().mockResolvedValue(MOCKS.userMock),
                        listCellsByPk: jest.fn().mockResolvedValue(MOCKS.cellsMock),
                    },
                },
            ],
        }).compile()

        userController = module.get<UserController>(UserController)
        userService = module.get<UserService>(UserService)
    })

    it('should be defined', async () => {
        expect(userController).toBeDefined()
        expect(userService).toBeDefined()
    })

    describe('getUser', () => {
        it(`Should return a single user`, async () => {
            const user = await userController.getUser(CONSTANTS.ID)
            const spy = jest.spyOn(userService, 'findUser')

            expect(user).toEqual(MOCKS.userMock)
            expect(user).toHaveProperty('login')
            expect(user.id).toEqual(CONSTANTS.ID)
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe('create', () => {
        it(`Should create a new user`, async () => {
            const newUser = await userController.create({
                name: String(CONSTANTS.NAME),
                login: CONSTANTS.LOGIN,
                password: CONSTANTS.PWD,
            } as UserDTO)

            const spy = jest.spyOn(userService, 'create')

            expect(newUser).toEqual(MOCKS.userMock)
            expect(newUser).toHaveProperty('created_at')
            expect(newUser.id).toEqual(CONSTANTS.ID)
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe('listCellsByPk', () => {
        it(`Should return a array of cells`, async () => {
            const cells = await userController.cells(CONSTANTS.ID)
            const spy = jest.spyOn(userService, 'listCellsByPk')

            expect(cells).toEqual(MOCKS.cellsMock)
            expect(cells[0]).toHaveProperty('created_at')
            expect(typeof cells).toBe('object')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })
})
