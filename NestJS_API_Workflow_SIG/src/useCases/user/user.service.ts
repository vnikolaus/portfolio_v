import * as bcrypt from 'bcryptjs'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { Repository } from 'typeorm'
import { UserDTO } from './dto/user.dto'
import { UserWhereOptions } from './typings/types'
import { Cell } from '../../entities/cell.entity'
import { SALT } from '../../constants/token.constants'
import { SessionError } from '../auth/errors/errors'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}

    async create({ name, login, password }: UserDTO): Promise<User> {
        try {
            const hashedPwd = await bcrypt.hash(password, SALT)

            const objUser = {
                name,
                login,
                password: hashedPwd,
            }

            const newUser = await this.userRepo.save(objUser)

            return {
                ...newUser,
                password: undefined,
                updated_at: undefined,
            }
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async findUser(where: UserWhereOptions): Promise<User> {
        try {
            const user = await this.userRepo.findOneBy(where)

            return user
        } catch (err) {
            throw new SessionError(err.code)
        }
    }

    async listCellsByPk(idUser: number): Promise<Cell[]> {
        try {
            if (typeof idUser === 'object') idUser = Object.values(idUser) as unknown as number

            const data = await this.userRepo
                .createQueryBuilder('user')
                .innerJoinAndSelect('user.cells', 'c')
                .where('user.id = :idUser', { idUser: idUser })
                .getMany()

            const { cells } = data[0]

            return cells
        } catch (err) {
            throw new SessionError(err.code)
        }
    }
}
