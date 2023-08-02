import * as CONSTANTS from '../../constants/product.constants'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Product } from '../../entities/product.entity'
import { ProductService } from './product.service'
import { UserService } from '../user/user.service'
import { Repository } from 'typeorm'
import { arrProductsMock, deleteResultMock, prodMock1 } from './mocks/ProductMocks'
import { ProductDTO } from './dto/product.dto'

const OBJ_PRODUCT = {
    name: CONSTANTS.NAME,
    code: CONSTANTS.CODE,
    price: CONSTANTS.PRICE,
    storage: CONSTANTS.STORAGE,
} as ProductDTO

describe(`Test's Product - UseCase`, () => {
    let productRepository: Repository<Product>
    let productService: ProductService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: {
                        find: jest.fn().mockReturnValue(arrProductsMock),
                        findOne: jest.fn().mockReturnValue(prodMock1),
                        update: jest.fn().mockReturnValue(prodMock1),
                        save: jest.fn().mockReturnValue(prodMock1),
                        delete: jest.fn().mockReturnValue(deleteResultMock),
                    },
                },
                {
                    provide: UserService,
                    useValue: {},
                },
            ],
        }).compile()

        productRepository = module.get<Repository<Product>>(getRepositoryToken(Product))
        productService = module.get<ProductService>(ProductService)
    })

    it('should be defined', async () => {
        expect(productRepository).toBeDefined()
        expect(productService).toBeDefined()
    })

    describe(`findAll`, () => {
        it(`should return a array of products`, async () => {
            const products = await productService.findAll()

            const spy = jest.spyOn(productRepository, 'find')

            expect(products).toEqual(arrProductsMock)
            expect(products[0]).toHaveProperty('price')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe(`findOne`, () => {
        it(`should return a single product`, async () => {
            const product = await productService.findOne(CONSTANTS.ID_PRODUCT)

            const spy = jest.spyOn(productRepository, 'findOne')

            expect(product).toEqual(prodMock1)
            expect(product).toHaveProperty('price')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe(`update`, () => {
        it(`should update a product`, async () => {
            const updatedProduct = await productService.update(CONSTANTS.ID_PRODUCT, OBJ_PRODUCT)

            const spy = jest.spyOn(productRepository, 'update')

            expect(updatedProduct).toEqual(prodMock1)
            expect(updatedProduct).toHaveProperty('updated_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe(`insert`, () => {
        it(`should insert a new product`, async () => {
            const newProduct = await productService.insert(OBJ_PRODUCT)

            const spy = jest.spyOn(productRepository, 'save')

            expect(newProduct).toEqual(prodMock1)
            expect(newProduct).toHaveProperty('created_at')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    describe(`delete`, () => {
        it(`should delete a product`, async () => {
            const deleteResult = await productService.delete(CONSTANTS.ID_PRODUCT)

            const spy = jest.spyOn(productRepository, 'delete')

            expect(deleteResult).toEqual(deleteResultMock)
            expect(typeof deleteResult).toBe('object')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })
})
