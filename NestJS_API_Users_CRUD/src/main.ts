import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './constants/server.constants'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const port = PORT || 3000
    await app.listen(+port, () => {
        console.log(`API online...\nhttp://localhost:${port}`)
    })
}
bootstrap()
