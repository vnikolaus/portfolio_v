import { NestFactory } from '@nestjs/core'
import SenderService from './useCases/Sender/sender.service'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const sender = new SenderService()

    const port = process.env.PORT || 3113
    await app.listen(port, () => {
        console.log(`API online...\nhttp://localhost:${port}`)
    })
}
bootstrap()
