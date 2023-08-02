import { DeleteResult } from 'typeorm'
import * as CONSTANTS from '../../../constants/product.constants'
import { Product } from '../../../entities/product.entity'

export const prodMock1 = new Product({
    id: CONSTANTS.ID_PRODUCT,
    name: CONSTANTS.NAME,
    code: CONSTANTS.CODE,
    price: CONSTANTS.PRICE,
    storage: CONSTANTS.STORAGE,
})

export const prodMock2 = new Product({
    id: CONSTANTS.ID_PRODUCT,
    name: CONSTANTS.NAME,
    code: CONSTANTS.CODE,
    price: CONSTANTS.PRICE,
    storage: CONSTANTS.STORAGE,
})

export const deleteResultMock = new DeleteResult()

export const arrProductsMock = [prodMock1, prodMock2]
