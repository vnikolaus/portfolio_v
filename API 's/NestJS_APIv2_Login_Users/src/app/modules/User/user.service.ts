import { Injectable } from '@nestjs/common'
import { User, UserProps } from '../../../domain/User'
import { UserRepositoryService } from '../../../infra/repositories/User/UserRepository.service'

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepositoryService) {}

    async add(user: UserProps) {
        const newUser = User.create(user)
        return await this.repository.save(newUser)
    }

    async list() {
        return await this.repository.find()
    }

    async findOne(email: string) {
        return await this.repository.findOne(email)
    }
}
