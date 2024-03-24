import { Module } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemController } from './item.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RepositoriesModule } from '../../../infra/repositories/repositories.module'
import { config as dotenv } from 'dotenv'
dotenv()

@Module({
    imports: [
        RepositoriesModule,
        ClientsModule.register([
            {
                name: 'CLIENT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.AMQP_URL],
                    queue: process.env.AMQP_QUEUE,
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule {}
