import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { config as dotenv } from 'dotenv'
dotenv()

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.AMQP_URL],
            queue: process.env.AMQP_QUEUE,
            queueOptions: {
                durable: false,
            },
        },
    })
    app.listen().then(() => {
        console.log(`Microservice online`)
    })
}
bootstrap()
