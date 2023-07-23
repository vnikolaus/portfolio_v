import { App } from './application/app'
App()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './application/app.module'

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule)
        await app.listen(process.env.API_PORT || 3333, async () => {
            console.log(`API is running...`)
            console.log(`http://localhost:${process.env.API_PORT}`)
        })
    } catch (err) {
        console.log(err);
    }
}
bootstrap()
