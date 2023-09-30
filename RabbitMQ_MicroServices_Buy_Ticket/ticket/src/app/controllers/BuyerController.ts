import { Registry } from '../../infra/registry/Registry'
import { BuyTicket } from '../useCases/BuyTicket'

export class BuyerController {
    constructor(readonly registry: Registry) {}

    async buy(req: Request, res: Response) {
        const input = req.body

        const buyTicket = new BuyTicket(this.registry)
        const purchasedTicket = await buyTicket.execute(input)

        return res.json(purchasedTicket)
    }
}
