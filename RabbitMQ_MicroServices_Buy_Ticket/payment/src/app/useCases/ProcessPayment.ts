import { Transaction } from '../../domain/entities/Transaction'
import { Registry } from '../../infra/registry/Registry'
import { FakePaymentGateway } from '../../infra/gateway/FakePaymentGateway'
import { TransactionRepository } from '../repositories/TransactionReposistory'
import { RabbitMQAdapter } from '../../infra/queue/RabbitMQAdapter'
import { TicketApproved } from '../../domain/events/TicketApproved'

export class ProcessPayment {
    private transactionRepository: TransactionRepository
    private paymentGateway: FakePaymentGateway
    private queue: RabbitMQAdapter

    constructor(readonly registry: Registry) {
        this.transactionRepository = registry.inject('transactionRepository')
        this.paymentGateway = registry.inject('paymentGateway')
        this.queue = registry.inject('queue')
    }

    async execute(input: Input): Promise<Output> {
        const { tid, price, status } = await this.paymentGateway.createTransaction(input.email, input.creditCardToken, input.price)

        const transaction = Transaction.create({
            ticket_id: input.ticket_id,
            event_id: input.event_id,
            price,
            tid,
            status,
        })

        await this.transactionRepository.save(transaction)
        if (status === 'approved') {
            const ticketApproved = new TicketApproved({ ticket_id: input.ticket_id })
            await this.queue.publish('ticketApproved', ticketApproved)
        }
    }
}

type Input = {
    ticket_id: string
    event_id: string
    email: string
    creditCardToken: string
    price: number
}

type Output = {
    price: number
    tid: string
    status: string
}
