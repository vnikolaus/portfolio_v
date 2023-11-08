import amqp from 'amqplib'

export class RabbitMQService implements Queue {
    private conn: amqp.Connection

    async connect() {
        this.conn = await amqp.connect(process.env.VITE_AMQP_URL)
    }

    async publish(queueName: string, data: unknown) {
        const channel = await this.conn.createChannel()
        await channel.assertQueue(queueName, { durable: true })
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    }

    async on(queueName: string, callback: FunctionConstructor) {
        const channel = await this.conn.createChannel()
        await channel.assertQueue(queueName, { durable: true })
        channel.consume(queueName, async (msg) => {
            const output = String(msg?.content)
            await callback(output)
            channel.ack(msg)
        })
    }
}
