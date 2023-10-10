import { Test } from '@nestjs/testing'
import { OBJ_PRODUCT } from '../product/product.controller.spec'
import { UserService } from '../user/user.service'
import { arrSigs, deleteResultMock, sig1 } from './mocks/SigMocks'
import { SigController } from './sig.controller'
import { SigService } from './sig.service'

describe(`Test's Sig - UseCase`, () => {
    let sigController: SigController
    let sigService: SigService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [SigController],
            providers: [
                {
                    provide: SigService,
                    useValue: {
                        findAll: jest.fn().mockReturnValue(arrSigs),
                        findSig: jest.fn().mockReturnValue(sig1),
                        createSig: jest.fn().mockReturnValue(sig1),
                        addProducts: jest.fn().mockReturnValue(sig1),
                        removeProducts: jest.fn().mockReturnValue(deleteResultMock),
                    },
                },
                {
                    provide: UserService,
                    useValue: {},
                },
            ],
        }).compile()

        sigController = module.get<SigController>(SigController)
        sigService = module.get<SigService>(SigService)
    })

    it('should be defined', async () => {
        expect(sigController).toBeDefined()
        expect(sigService).toBeDefined()
    })

    describe('Sig Controller', () => {
        test(`list`, async () => {
            const sigs = await sigController.list()

            const spy = jest.spyOn(sigService, 'findAll')

            expect(sigs).toEqual(arrSigs)
            expect(sigs[0]).toHaveProperty('created_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })

        test(`getSig`, async () => {
            const sig = await sigController.getSig(1)

            const spy = jest.spyOn(sigService, 'findSig')

            expect(sig).toEqual(sig1)
            expect(typeof sig).toBe('object')
            expect(spy).toHaveBeenCalledTimes(1)
        })

        test(`addProducts`, async () => {
            const sig = await sigController.addProducts(1, [OBJ_PRODUCT])

            const spy = jest.spyOn(sigService, 'addProducts')

            expect(sig).toEqual(sig1)
            expect(sig.products).toEqual(sig1.products)
            expect(spy).toHaveBeenCalledTimes(1)
        })

        test(`removeProducts`, async () => {
            const removeResult = await sigController.removeProducts(11)

            const spy = jest.spyOn(sigService, 'removeProducts')

            expect(removeResult).toEqual(deleteResultMock)
            expect(typeof removeResult).toBe('object')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })
})
