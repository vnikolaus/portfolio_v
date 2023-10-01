import { Queue } from './Queue'
import amqp from 'amqplib'

export class RabbitMQAdapter implements Queue {
    private conn: amqp.Connection

    async connect(): Promise<void> {
        this.conn = await amqp.connect(process.env.AMQP_URL)
    }

    async on(queueName: string, callback: FunctionConstructor): Promise<void> {
        const channel = await this.conn.createChannel()
        await channel.assertQueue(queueName, { durable: true })
        channel.consume(queueName, async (msg) => {
            const data = String(msg.content)
            await callback(data)
            channel.ack(msg)
        })
    }

    async publish(queueName: string, data: unknown): Promise<void> {
        const channel = await this.conn.createChannel()
        await channel.assertQueue(queueName, { durable: true })
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    }
}
