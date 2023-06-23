import { Router } from 'express';
import UserController from '../controllers/UserController';
import autentication from '../middlewares/autentication';

const router = new Router();

router.get('/', UserController.index);
router.post('/', autentication, UserController.store);
router.put('/', autentication, UserController.update);
router.delete('/', autentication, UserController.delete);

export default router;
