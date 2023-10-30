import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config as dotenv } from 'dotenv'
dotenv()

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api/v1')

    const port = +process.env.HTTP_PORT || 3001
    await app.listen(port, () => {
        console.log(`Server running at: http://localhost:${port}`)
    })
}
bootstrap()
