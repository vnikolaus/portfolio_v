import { Router } from 'express';
import stockController from '../controllers/StockController';
import autentication from '../middlewares/autentication';

const router = new Router();

router.get('/', stockController.list);
router.get('/:symbol', stockController.show);
router.post('/', autentication, stockController.insert);
router.put('/:symbol', autentication, stockController.update);
router.delete('/:symbol', autentication, stockController.delete);

export default router;
