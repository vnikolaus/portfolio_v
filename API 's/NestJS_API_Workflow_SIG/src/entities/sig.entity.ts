import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Sig {
    @PrimaryGeneratedColumn()
    idDocumento: number

    @Column()
    idSolicitante: number

    @Column()
    solicitante: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToMany(() => Product, (product) => product.id)
    @JoinTable({
        name: 'sig_products',
        joinColumn: {
            name: 'idDocumento',
            referencedColumnName: 'idDocumento',
        },
        inverseJoinColumn: {
            name: 'idProduto',
            referencedColumnName: 'id',
        },
    })
    products: Product[]

    constructor(sut?: Partial<Sig>) {
        if (sut) {
            this.idDocumento = sut?.idDocumento
            this.idSolicitante = sut?.idSolicitante
            this.solicitante = sut?.solicitante
            this.created_at = sut?.created_at
            this.updated_at = sut?.updated_at
        }
    }
}
