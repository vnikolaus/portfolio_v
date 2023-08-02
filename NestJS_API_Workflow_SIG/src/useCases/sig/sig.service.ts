import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../../entities/product.entity'
import { Sig } from '../../entities/sig.entity'
import { User } from '../../entities/user.entity'
import { DeleteResult, Repository } from 'typeorm'
import { SessionError } from '../auth/errors/errors'
import { ProductService } from '../product/product.service'

@Injectable()
export class SigService {
    constructor(
        @InjectRepository(Sig)
        private readonly sigRepo: Repository<Sig>,
        private prodService: ProductService
    ) {}

    async findAll(): Promise<Sig[]> {
        try {
            const sigs = await this.sigRepo.find()
            return sigs
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async findSig(id: number): Promise<Sig> {
        try {
            if (typeof id === 'object') id = Object.values(id) as unknown as number

            const sig = await this.sigRepo.findOne({ where: { idDocumento: id } })

            if (!sig) throw new SessionError('Params not found.')

            const completeSig = await this.sigRepo
                .createQueryBuilder('sig')
                .innerJoinAndSelect('sig.products', 'p')
                .where('sig.idDocumento = :id', { id: sig.idDocumento })
                .getOne()

            return completeSig
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async createSig(user: User): Promise<Sig> {
        try {
            const newSig = {
                idSolicitante: user.id,
                solicitante: user.name,
            } as Sig

            await this.sigRepo.save(newSig)

            return newSig
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async addProducts(id: number, products: Product): Promise<Sig> {
        try {
            if (typeof id === 'object') id = Object.values(id) as unknown as number

            const sig = await this.sigRepo.findOne({ where: { idDocumento: id } })

            for (const i in products) {
                const _products = await this.prodService.findOneByCode(products[i].code)
                await this.prodService.updateStorage(_products.id, products[i].amount)

                await this.sigRepo
                    .createQueryBuilder()
                    .insert()
                    .into('sig_products')
                    .values({ idDocumento: sig.idDocumento, idProduto: _products.id })
                    .execute()
            }

            const completeSig = await this.findSig(id)
            return completeSig
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async removeProducts(idSig: number, idProduct: number): Promise<DeleteResult> {
        try {
            const product = await this.prodService.findOne(idProduct)

            const productObj = {
                ...product,
                quantity: null,
                storage: product.storage + product.quantity,
            }

            await this.prodService.update(idProduct, productObj)

            const result = await this.sigRepo
                .createQueryBuilder()
                .delete()
                .from('sig_products')
                .where({ idDocumento: idSig, idProduto: idProduct })
                .execute()

            return result
        } catch (err) {
            throw new SessionError(err.code)
        }
    }
}
