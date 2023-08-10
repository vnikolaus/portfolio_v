import { Module } from '@nestjs/common'
import { SenderService } from './sender.service'
import { SenderController } from './sender.controller'

@Module({
    controllers: [SenderController],
    providers: [SenderService],
})
export class SenderModule {}
