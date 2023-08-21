import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { RepositoriesModule } from './repositories/repositories.module'
import { UserModule } from './useCases/user/user.module'

@Module({
    imports: [DatabaseModule, RepositoriesModule, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
