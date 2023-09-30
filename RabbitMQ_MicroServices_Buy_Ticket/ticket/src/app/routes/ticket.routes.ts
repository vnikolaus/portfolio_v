import { Request, Response, Router } from 'express'
import { buyerController } from '../../infra/registry'

const buyerRouter = Router()

buyerRouter.post('/buy', (req: Request, res: Response) => buyerController.buy(req, res))

export { buyerRouter }
