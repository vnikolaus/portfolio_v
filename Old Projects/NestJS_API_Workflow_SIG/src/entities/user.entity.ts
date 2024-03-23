import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Cell } from './cell.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 45 })
    name: string

    @Column({ length: 25, unique: true })
    login: string

    @Column({ length: 140 })
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToMany(() => Cell)
    @JoinTable({
        name: 'cells_user',
        joinColumn: {
            name: 'idUser',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'idCell',
            referencedColumnName: 'id',
        },
    })
    cells: Cell[]

    constructor(sut?: Partial<User>) {
        if (sut) {
            this.id = sut?.id
            this.name = sut?.name
            this.login = sut?.login
            this.password = sut?.password
            this.created_at = sut?.created_at
            this.updated_at = sut?.updated_at
        }
    }
}
