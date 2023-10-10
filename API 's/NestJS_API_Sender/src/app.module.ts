import { Module } from '@nestjs/common'
import { SenderModule } from './useCases/Sender/sender.module'

@Module({
    imports: [SenderModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
