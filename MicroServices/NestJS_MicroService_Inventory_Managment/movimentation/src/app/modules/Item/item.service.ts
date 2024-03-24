import { Injectable, Inject } from '@nestjs/common'
import { Movimentation } from '../../../domain/Movimentation'
import { Item } from '../../../domain/Item'
import { ClientProxy } from '@nestjs/microservices'
import { ItemDTO } from 'src/domain/dto/ItemDTO'
import { MovimentationRepository } from 'src/infra/repositories/MovimentationRepository'

@Injectable()
export class ItemService {
    constructor(
        @Inject('CLIENT_SERVICE') private readonly client: ClientProxy,
        readonly movRepository: MovimentationRepository,
    ) {}

    async handle(item: ItemDTO) {
        const newItem = new Item(item)
        const movimentation = Movimentation.create(newItem)
        await Promise.all([this.movRepository.insert(movimentation), this.client.emit('new_movimentation', movimentation)])
        return {
            new_movimentation_id: movimentation.id,
            status: movimentation.status,
        }
    }
}
