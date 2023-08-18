import { Module } from '@nestjs/common'
import { CasesModule } from './api/useCases/cases.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [CasesModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
