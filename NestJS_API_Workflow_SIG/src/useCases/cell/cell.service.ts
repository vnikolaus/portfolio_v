import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cell } from '../../entities/cell.entity'
import { Repository } from 'typeorm'
import { CellDTO } from './dto/cell.dto'
import { AddMemberProps, RemoveMemberProps } from './typings/types'
import { SessionError } from '../auth/errors/errors'

@Injectable()
export class CellService {
    constructor(
        @InjectRepository(Cell)
        private cellRepo: Repository<Cell>
    ) {}

    async create({ cell, fixedType }: CellDTO): Promise<Cell> {
        try {
            const newCell = { cell, fixedType }

            const _cell = await this.cellRepo.save(newCell)
            return _cell
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async listCells(): Promise<Cell[]> {
        try {
            const cells = await this.cellRepo.find()
            return cells
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async listCellMembers(idCell: number): Promise<Cell[]> {
        try {
            if (typeof idCell === 'object') idCell = Object.values(idCell) as unknown as number

            const cells = await this.cellRepo
                .createQueryBuilder('cell')
                .innerJoinAndSelect('cell.members', 'm')
                .where(`cell.id = :idCell`, { idCell: idCell })
                .getMany()

            for (const i of cells) {
                i.members[0].password = undefined
                i.members[0].updated_at = undefined
            }

            return cells
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async addMember({ idUser, idCell }: AddMemberProps): Promise<void> {
        try {
            await this.cellRepo.createQueryBuilder().insert().into('cells_user').values({ idUser: idUser, idCell: idCell }).execute()

            await this.cellRepo.createQueryBuilder().insert().into('cell_members').values({ idCell: idCell, idUser: idUser }).execute()

            const cell = await this.cellRepo.findOneBy({ id: idCell })
            console.log(`New member\nID User: ${idUser}  ---  Cell: ${cell.cell}\n`)
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async removeMember({ idUser, idCell }: RemoveMemberProps): Promise<void> {
        try {
            await this.cellRepo.createQueryBuilder().delete().from('cells_user').where({ idUser: idUser, idCell: idCell }).execute()

            await this.cellRepo.createQueryBuilder().delete().from('cell_members').where({ idCell: idCell, idUser: idUser }).execute()

            const cell = await this.cellRepo.findOneBy({ id: idCell })
            console.log(`Member removed\nID User: ${idUser}  ---  Cell: ${cell.cell}\n`)
        } catch (err) {
            throw new SessionError(err.code)
        }
    }
}
