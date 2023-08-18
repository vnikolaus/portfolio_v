import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './api/constants/server.constants'
import { KeyGuard } from './auth/guards/key.guard'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const REFLECTOR = new Reflector()
    const KEY_GUARD = new KeyGuard(REFLECTOR)

    app.useGlobalGuards(KEY_GUARD)

    const port = +PORT || 3000
    await app.listen(port, () => {
        console.log(`API online...\nhttp://localhost:${port}`)
    })
}
bootstrap()
