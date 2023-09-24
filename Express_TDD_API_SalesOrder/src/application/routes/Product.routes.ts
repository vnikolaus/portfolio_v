import { Request, Response, Router } from 'express'
import { productController } from '../controllers'
const router = Router()

router.get('/', (req: Request, res: Response) => productController.list(req, res))
router.get('/:id', (req: Request, res: Response) => productController.find(req, res))
router.get('/code/:code', (req: Request, res: Response) => productController.findByCode(req, res))
router.post('/', (req: Request, res: Response) => productController.add(req, res))

export default router
