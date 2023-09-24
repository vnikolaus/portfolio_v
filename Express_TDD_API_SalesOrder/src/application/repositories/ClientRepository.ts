import { Client } from '../../domain/entities/Client'
import { DB } from '../../infra/database/db'

interface RepoCL {
    list(): Promise<Client[]>
    find(client: Client): Promise<Client>
    findByCode(code: string): Promise<Client>
    add(client: Client): Promise<Client>
    remove(id: string): Promise<void>
}

export class ClientRepository implements RepoCL {
    private readonly db: DB

    constructor(database: DB) {
        this.db = database
    }

    async list() {
        return await this.db.list('clients')
    }

    async find(id: string) {
        return await this.db.get('clients', id)
    }

    async findByCode(code: string) {
        const clients = await this.db.list('clients')
        const findedClient = clients.find((client) => client.code === code)
        if (!findedClient) throw new Error('Client not found')

        return findedClient
    }

    async add(client: Client) {
        const newClient = new Client(client)
        await this.db.insert<Client>('clients', newClient.props)
        return newClient
    }

    async remove(id: string) {
        await this.db.delete('clients', id)
    }
}
