import { Request, Response } from 'express'
import { ClientRepository } from '../repositories/ClientRepository'

export class ClientController {
    constructor(private repository: ClientRepository) {}

    async list(req: Request, res: Response) {
        const clients = await this.repository.list()
        return res.json({ clients })
    }

    async find(req: Request, res: Response) {
        const { id } = req.params
        const client = await this.repository.find(id)
        return res.json({ client })
    }

    async findByCode(req: Request, res: Response) {
        const { code } = req.params
        const client = await this.repository.findByCode(code)
        return res.json({ client })
    }

    async add(req: Request, res: Response) {
        const client = req.body
        const newClient = await this.repository.add(client)
        return res.status(201).json({ newClient: newClient.props })
    }
}
