import { Request, Response, Router } from 'express'
import { salesOrderController } from '../controllers'
const router = Router()

router.get('/', (req: Request, res: Response) => salesOrderController.list(req, res))
router.get('/:id', (req: Request, res: Response) => salesOrderController.find(req, res))
router.post('/', (req: Request, res: Response) => salesOrderController.add(req, res))
router.delete('/:id', (req: Request, res: Response) => salesOrderController.remove(req, res))

export default router
