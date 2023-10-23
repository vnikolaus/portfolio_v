import { Request, Response, Router } from 'express'
import { clientController } from '../controllers'
const router = Router()

router.get('/', (req: Request, res: Response) => clientController.list(req, res))
router.get('/:id', (req: Request, res: Response) => clientController.find(req, res))
router.get('/code/:code', (req: Request, res: Response) => clientController.findByCode(req, res))
router.post('/', (req: Request, res: Response) => clientController.add(req, res))

export default router
