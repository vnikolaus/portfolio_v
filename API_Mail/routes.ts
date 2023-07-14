import { Router } from "express";
const router = Router()

import { createUserController } from './src/useCases/CreateUser/main'

router.post('/users', (req, res) => {
    return createUserController.handle(req, res)
})

router.get('/users', createUserController.show)

export { router }