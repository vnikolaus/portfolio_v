import { Module } from '@nestjs/common'
import { MovimentationRepository } from './MovimentationRepository'
import { DatabaseService } from '../database/database.service'

@Module({
    imports: [],
    controllers: [],
    providers: [DatabaseService, MovimentationRepository],
    exports: [MovimentationRepository],
})
export class RepositoriesModule {}
