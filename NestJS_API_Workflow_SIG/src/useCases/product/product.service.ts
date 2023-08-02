import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../../entities/product.entity'
import { DeleteResult, Repository } from 'typeorm'
import { ProductDTO } from './dto/product.dto'
import { UserService } from '../user/user.service'
import { SessionError } from '../auth/errors/errors'
import { CELL_ADMIN } from '../../constants/admin.constants'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private prodRepo: Repository<Product>,
        private userService: UserService
    ) {}

    async findAll(): Promise<Product[]> {
        try {
            const products = await this.prodRepo.find()
            return products
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async findOne(id: number): Promise<Product> {
        try {
            const product = await this.prodRepo.findOne({ where: { id: id } })
            return product
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async findOneByCode(code: string): Promise<Product> {
        try {
            const product = await this.prodRepo.findOne({ where: { code: code } })
            return product
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async update(id: number, product: ProductDTO): Promise<Product> {
        try {
            if (typeof id === 'object') id = Object.values(id) as unknown as number

            const { code, name, price, quantity, storage } = product

            const result = await this.prodRepo.update(
                { id: id },
                {
                    code,
                    name,
                    price,
                    quantity,
                    storage,
                }
            )
            console.log('Update Product Service:', result)
            const savedProduct = await this.findOne(id)
            return savedProduct
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async insert(product: ProductDTO): Promise<Product> {
        try {
            const newProduct = await this.prodRepo.save(product)

            return newProduct
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        try {
            if (typeof id === 'object') id = Object.values(id) as unknown as number

            const result = await this.prodRepo.delete({ id: id })

            console.log(`Deleting product\nID: ${id}`)
            return result
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async checkDeptoCompras(id: number): Promise<boolean> {
        try {
            const cells = await this.userService.listCellsByPk(id)
            let check = false

            for (const i of cells) {
                if (i.fixedType === CELL_ADMIN || i.fixedType === 'CMP_HOLDING') {
                    check = true
                    return check
                }
            }

            return check
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async updateStorage(id: number, quantity: number): Promise<Product> {
        try {
            const obj = await this.findOne(id)
            const updatedProduct = {
                ...obj,
                quantity: quantity,
                storage: obj.storage - quantity,
            } as Product

            if (updatedProduct.storage < 0) throw new SessionError('Empty stock.')

            await this.update(id, updatedProduct)

            return updatedProduct
        } catch (err) {
            throw new SessionError(err.code)
        }
    }
}
