import { Router } from "express";
const router = Router()

import autentication from "./src/middlewares/autentication";
import { createUserController } from './src/useCases/CreateUser/main'
import { storeTokenController } from "./src/useCases/CreateUser/main";

router.get('/users', createUserController.show)
router.post('/users', autentication, createUserController.handle)

router.post('/newtoken', storeTokenController.store)

export { router }