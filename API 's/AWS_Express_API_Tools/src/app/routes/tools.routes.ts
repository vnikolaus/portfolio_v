import { Router, Request, Response } from "express";
import { toolsController } from "../controllers";

const router = Router()

router.get('/tools/:code', async (req: Request, res: Response) => await toolsController.find(req, res))
router.get('/tools', async (req: Request, res: Response) => await toolsController.listTools(req, res))
router.post('/tools', async (req: Request, res: Response) => await toolsController.add(req, res))
router.patch('/tools', async (req: Request, res: Response) => await toolsController.update(req, res))
router.delete('/tools/:code', async (req: Request, res: Response) => await toolsController.remove(req, res))

export default router
