import { Module } from '@nestjs/common'
import { MovimentationService } from './movimentation.service'
import { MovimentationController } from './movimentation.controller'
import { RepositoriesModule } from 'src/infra/repositories/repositories.module'

@Module({
    imports: [RepositoriesModule],
    controllers: [MovimentationController],
    providers: [MovimentationService],
})
export class MovimentationModule {}
