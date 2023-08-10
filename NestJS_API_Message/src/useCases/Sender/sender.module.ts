import { Module } from '@nestjs/common'
import { SenderService } from './sender.service'
import { SenderController } from './sender.controller'

@Module({
    controllers: [SenderController],
    providers: [SenderService],
    exports: [SenderService]
})
export class SenderModule {}
