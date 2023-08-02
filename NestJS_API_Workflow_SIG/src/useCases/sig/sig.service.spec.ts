import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import { SessionError } from '../auth/errors/errors'
import { ID, NAME } from '../../constants/user.constants'
import { OBJ_PRODUCT } from '../product/product.controller.spec'
import { Sig } from '../../entities/sig.entity'
import { User } from '../../entities/user.entity'
import { ProductService } from '../product/product.service'
import { SigService } from './sig.service'
import { arrSigs, deleteResultMock, sig1 } from './mocks/SigMocks'

describe(`Test's Sig - UseCase`, () => {
    let sigService: SigService
    let productService: ProductService
    let sigRepository: Repository<Sig>

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                SigService,
                {
                    provide: getRepositoryToken(Sig),
                    useValue: {
                        find: jest.fn().mockReturnValue(arrSigs),
                        findOne: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: ProductService,
                    useValue: {},
                },
            ],
        }).compile()

        sigService = module.get<SigService>(SigService)
        productService = module.get<ProductService>(ProductService)
        sigRepository = module.get<Repository<Sig>>(getRepositoryToken(Sig))
    })

    it('should be defined', async () => {
        expect(sigService).toBeDefined()
        expect(productService).toBeDefined()
        expect(sigRepository).toBeDefined()
    })

    describe('findAll', () => {
        test(`should return a array of sigs`, async () => {
            const sigs = await sigService.findAll()

            const spy = jest.spyOn(sigRepository, 'find')

            expect(sigs).toEqual(arrSigs)
            expect(sigs[0]).toHaveProperty('created_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe('findSig', () => {
        test(`should return a single sig`, async () => {
            jest.spyOn(sigService, 'findSig').mockResolvedValueOnce(sig1)

            const sig = await sigService.findSig(1)

            expect(sig).toEqual(sig1)
            expect(typeof sig).toBe('object')
        })
    })

    describe('findSig', () => {
        test(`should throw a error if sig not exists`, async () => {
            expect(async () => {
                await sigService.findSig(1)
            }).rejects.toThrowError(SessionError)
        })
    })

    describe('createSig', () => {
        test(`should create a new sig`, async () => {
            const newSig = await sigService.createSig({
                id: ID,
                name: NAME,
            } as User)

            const spy = jest.spyOn(sigRepository, 'save')

            expect(newSig).toHaveProperty('idSolicitante')
            expect(typeof newSig).toBe('object')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe('addProducts', () => {
        test(`should add products into sig`, async () => {
            jest.spyOn(sigService, 'addProducts').mockResolvedValueOnce(sig1)

            const newSig = await sigService.addProducts(1, OBJ_PRODUCT)

            expect(newSig).toHaveProperty('updated_at')
            expect(newSig.idSolicitante).toEqual(sig1.idSolicitante)
            expect(typeof newSig).toBe('object')
        })
    })

    describe('removeProducts', () => {
        test(`should remove product of a sig`, async () => {
            jest.spyOn(sigService, 'removeProducts').mockResolvedValueOnce(deleteResultMock)

            const removeResult = await sigService.removeProducts(1, 1)

            expect(removeResult).toEqual(deleteResultMock)
            expect(typeof removeResult).toBe('object')
        })
    })
})
