import { Module } from '@nestjs/common'
import { KeyGuard } from './guards/key.guard'

@Module({
    imports: [],
    providers: [KeyGuard],
    exports: [KeyGuard],
})
export class AuthModule {}
