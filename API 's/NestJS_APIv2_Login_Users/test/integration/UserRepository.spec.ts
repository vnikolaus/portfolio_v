import { Test } from '@nestjs/testing'
import { Model } from 'mongoose'
import { User } from '../../src/domain/entities/User'
import { getModelToken } from '@nestjs/mongoose'
import { UserRepositoryService } from '../../src/infra/repositories/User/UserRepository.service'
import { userMock } from './mocks/UserMock'

describe('UserService - Test', () => {
    let userModel: Model<User>
    let userRepository: UserRepositoryService

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        Model,
                        save: jest.fn().mockResolvedValue(userMock),
                    },
                },
                {
                    provide: UserRepositoryService,
                    useValue: {
                        save: jest.fn().mockResolvedValue(userMock),
                        find: jest.fn().mockResolvedValue([userMock]),
                    },
                },
            ],
        }).compile()

        userModel = testModule.get<Model<User>>(getModelToken(User.name))
        userRepository = testModule.get<UserRepositoryService>(UserRepositoryService)
    })

    it('Module should be defined', () => {
        expect(userModel).toBeDefined()
        expect(userRepository).toBeDefined()
    })

    it('should save a new user', async () => {
        const obj = { email: 'fake@email.com', pwd: 'fakepwd' }
        const user = User.create(obj)
        const savedUser = await userRepository.save(user)
        expect(savedUser._id).toBeDefined()
        expect(savedUser).toStrictEqual(userMock)
    })

    it('should return a list of users', async () => {
        const users = await userRepository.find()
        expect(users.length).toBeGreaterThanOrEqual(1)
        expect(users.at(0)).toEqual(userMock)
    })
})
