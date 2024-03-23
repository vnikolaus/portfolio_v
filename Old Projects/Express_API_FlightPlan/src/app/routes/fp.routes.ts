import { Request, Response, Router } from 'express'
import { fpController } from '../controllers'

const fpRouter = Router()

fpRouter.get('/fps', (req: Request, res: Response) => fpController.list(req, res))
fpRouter.post('/fps', (req: Request, res: Response) => fpController.create(req, res))
fpRouter.delete('/fps/:id', (req: Request, res: Response) => fpController.remove(req, res))
fpRouter.patch('/fps/:id', (req: Request, res: Response) => fpController.update(req, res))

export { fpRouter }
