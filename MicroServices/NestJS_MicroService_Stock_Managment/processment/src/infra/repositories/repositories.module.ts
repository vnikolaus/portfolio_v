import { Module } from '@nestjs/common'
import { StockRepository } from './StockRepository'
import { DatabaseService } from '../database/database.service'
import { MovimentationRepository } from './MovimentationRepository'

@Module({
    providers: [DatabaseService, StockRepository, MovimentationRepository],
    exports: [StockRepository, MovimentationRepository],
})
export class RepositoriesModule {}
