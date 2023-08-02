import { Test } from '@nestjs/testing'
import * as CONSTANTS from '../../constants/product.constants'
import { ProductDTO } from './dto/product.dto'
import { arrProductsMock, deleteResultMock, prodMock1 } from './mocks/ProductMocks'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { SessionError } from '../auth/errors/errors'

export const OBJ_PRODUCT = {
    name: CONSTANTS.NAME,
    code: CONSTANTS.CODE,
    price: CONSTANTS.PRICE,
    storage: CONSTANTS.STORAGE,
} as ProductDTO

describe(`Test's Product - UseCase`, () => {
    let productController: ProductController
    let productService: ProductService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        findAll: jest.fn().mockReturnValue(arrProductsMock),
                        findOne: jest.fn().mockReturnValue(prodMock1),
                        findOneByCode: jest.fn().mockReturnValue(prodMock1),
                        update: jest.fn().mockReturnValue(prodMock1),
                        insert: jest.fn().mockReturnValue(prodMock1),
                        delete: jest.fn().mockReturnValue(deleteResultMock),
                        updateStorage: jest.fn().mockReturnValue(prodMock1),
                    },
                },
            ],
        }).compile()

        productController = module.get<ProductController>(ProductController)
        productService = module.get<ProductService>(ProductService)
    })

    it('should be defined', async () => {
        expect(productController).toBeDefined()
        expect(productService).toBeDefined()
    })

    describe('Product Controller', () => {
        test(`list`, async () => {
            const products = await productController.list()

            const spy = jest.spyOn(productService, 'findAll')

            expect(products).toEqual(arrProductsMock)
            expect(spy).toHaveBeenCalledTimes(1)
        })

        test(`add`, async () => {
            const newProduct = await productController.add(OBJ_PRODUCT)

            const spy = jest.spyOn(productService, 'insert')

            expect(newProduct).toEqual(prodMock1)
            expect(newProduct).toHaveProperty('created_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })

        test(`update`, async () => {
            const updatedProduct = await productController.update(CONSTANTS.ID_PRODUCT, OBJ_PRODUCT)

            const spy = jest.spyOn(productService, 'update')

            expect(updatedProduct).toEqual(prodMock1)
            expect(updatedProduct).toHaveProperty('updated_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })

        test(`delete`, async () => {
            const deleteResult = await productController.remove(CONSTANTS.ID_PRODUCT)

            const spy = jest.spyOn(productService, 'delete')

            expect(deleteResult).toEqual(deleteResultMock)
            expect(typeof deleteResult).toBe('object')
            expect(spy).toHaveBeenCalledTimes(1)
        })

        describe(`updateStorage`, () => {
            it(`should not update a storage if storage lower then zero`, () => {
                jest.spyOn(productService, 'updateStorage').mockRejectedValueOnce(new SessionError())

                expect(async () => {
                    await productService.updateStorage(CONSTANTS.ID_PRODUCT, 110)
                }).rejects.toThrowError(SessionError)
            })

            it(`should update storage of product, and add a quantity property`, async () => {
                const newStorage = await productService.updateStorage(CONSTANTS.ID_PRODUCT, 10)

                expect(newStorage).toEqual(prodMock1)
                expect(newStorage).toHaveProperty('quantity')
            })
        })
    })
})
