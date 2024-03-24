import { Module } from '@nestjs/common'
import { ItemModule } from './app/modules/Item/item.module'
import { MovimentationModule } from './app/modules/movimentation/movimentation.module'
import { DatabaseService } from './infra/database/database.service'

@Module({
    imports: [ItemModule, MovimentationModule],
    controllers: [],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class AppModule {}
