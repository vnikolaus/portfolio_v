import { BuyerController } from '../../app/controllers/BuyerController'
import { ApproveTicket } from '../../app/useCases/ApproveTicket'
import { connection } from '../db/connection'
import { QueueController } from '../queue/QueueController'
import { RabbitMQAdapter } from '../queue/RabbitMQAdapter'
import { EventRepositoryDatabase } from '../repository/EventRepositoryDatabase'
import { TicketRepositoryDatabase } from '../repository/TicketRepositoryDatabase'
import { Registry } from './Registry'

const registry = new Registry()
const queue = new RabbitMQAdapter()
const buyerController = new BuyerController(registry)

async function main() {
    await queue.connect()
    
    registry.provide('connection', connection)
    registry.provide('eventRepository', new EventRepositoryDatabase(registry))
    registry.provide('ticketRepository', new TicketRepositoryDatabase(registry))
    registry.provide('approveTicket', new ApproveTicket(registry))
    registry.provide('queue', queue)
    new QueueController(registry)
}

main()

export { registry, buyerController }
