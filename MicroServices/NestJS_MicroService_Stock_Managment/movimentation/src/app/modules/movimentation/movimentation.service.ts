import { Injectable } from '@nestjs/common'
import { MovimentationRepository } from 'src/infra/repositories/MovimentationRepository'

@Injectable()
export class MovimentationService {
    constructor(private readonly repository: MovimentationRepository) {}

    async findOne(id: string) {
        return await this.repository.find(id)
    }
}
