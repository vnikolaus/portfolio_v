import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '../../domain/User'
import { RepositoriesService } from '../../repositories/repositories.service'
import { ChangeEmailProps } from './typings/types'
import { userSchema } from './validations/user.validation'
import { validCPF } from './helpers/validCpf'
import { ZodError } from 'zod'

@Injectable()
export class UserService {
    constructor(private readonly repository: RepositoriesService) {}

    async createUser(user: User) {
        try {
            if (typeof user.cpf !== 'string') throw new Error('Invalid data type')
            user.cpf = user.cpf.replace(/[^0-9]/g, '')

            userSchema.parse(user)

            return await this.repository.create(user)
        } catch (err) {
            if (err instanceof ZodError) {
                const [{ message }] = err.issues
                throw new UnauthorizedException(message)
            }
            throw new UnauthorizedException(err.message)
        }
    }

    async findAll() {
        return await this.repository.list()
    }

    async findByPk(id: string) {
        return await this.repository.findOne(id)
    }

    async updateUser(user: Partial<User>) {
        return await this.repository.update(user)
    }

    async removeUser(id: string) {
        return await this.repository.delete(id)
    }

    async changeEmail({ id, email }: ChangeEmailProps) {
        const user = await this.repository.findOne(id)

        return Object.assign(user, email)
    }

    async checkCpf() {
        const users = await this.findAll()
        const usersWithError: User[] = []

        for (const user of users) {
            const validation = validCPF(user.cpf)

            if (!validation) usersWithError.push(user)
        }

        return usersWithError
    }
}
