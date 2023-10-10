import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Cell {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 60 })
    cell: string

    @Column({ length: 25, unique: true })
    fixedType: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToMany(() => User)
    @JoinTable({
        name: 'cell_members',
        joinColumn: {
            name: 'idCell',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'idUser',
            referencedColumnName: 'id',
        },
    })
    members: User[]

    constructor(sut?: Partial<Cell>) {
        if (sut) {
            this.id = sut?.id
            this.cell = sut?.cell
            this.fixedType = sut?.fixedType
            this.created_at = sut?.created_at
            this.updated_at = sut?.updated_at
        }
    }
}
