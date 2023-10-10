import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './src/app.module'
import { ValidationPipe } from '@nestjs/common'
import { AdminGuard } from 'src/useCases/auth/guards/admin.guard'
import { API_PORT } from 'src/constants/api.constants'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const REFLECTOR = new Reflector()
    const ADMIN_GUARD = new AdminGuard(REFLECTOR)

    app.useGlobalGuards(ADMIN_GUARD)

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )

    await app.listen(API_PORT || 3100, () => {
        console.log(`API online...\nhttp://localhost:${API_PORT}`)
    })
}
bootstrap()
