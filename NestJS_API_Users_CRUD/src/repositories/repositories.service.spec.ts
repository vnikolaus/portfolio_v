import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model } from 'mongoose'
import { User } from '../domain/User'
import { userMock } from '../useCases/user/mocks/user.mocks'
import { RepositoriesService } from './repositories.service'
import { TEST_ID } from '../constants/user.constants'

describe(`Test's User Repository - Repositories`, () => {
    let userModel: Model<User>
    let repositoriesService: RepositoriesService

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        Model,
                    },
                },
                {
                    provide: RepositoriesService,
                    useValue: {
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile()

        userModel = testModule.get<Model<User>>(getModelToken(User.name))
        repositoriesService = testModule.get<RepositoriesService>(RepositoriesService)
    })

    it('Module should be defined', () => {
        expect(userModel).toBeDefined()
        expect(repositoriesService).toBeDefined()
    })

    describe('User Repository', () => {
        describe('Create', () => {
            it(`Should throw a error if params not acceptable.`, async () => {
                jest.spyOn(repositoriesService, 'create').mockRejectedValueOnce(new Error())

                expect(repositoriesService.create({ email: '', ...userMock })).rejects.toThrowError(Error)
            })
        })

        describe('Update', () => {
            it(`Should throw a error if params not acceptable.`, async () => {
                jest.spyOn(repositoriesService, 'update').mockRejectedValueOnce(new Error())

                expect(repositoriesService.update({ email: '', ...userMock })).rejects.toThrowError(Error)
            })
        })

        describe('Delete', () => {
            it(`Should throw a error if params not acceptable.`, async () => {
                jest.spyOn(repositoriesService, 'delete').mockRejectedValueOnce(new Error())

                expect(repositoriesService.delete(TEST_ID + 'x')).rejects.toThrowError(Error)
            })
        })
    })
})
