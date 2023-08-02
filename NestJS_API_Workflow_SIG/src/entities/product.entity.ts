import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 60 })
    name: string

    @Column({ length: 25, unique: true })
    code: string

    @Column('decimal', { precision: 8, scale: 2 })
    price: number

    @Column({ nullable: true })
    quantity: number

    @Column()
    storage: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor(sut?: Partial<Product>) {
        if (sut) {
            this.id = sut?.id
            this.name = sut?.name
            this.code = sut?.code
            this.price = sut?.price
            this.quantity = sut?.quantity
            this.storage = sut?.storage
            this.created_at = sut?.created_at
            this.updated_at = sut?.updated_at
        }
    }
}
