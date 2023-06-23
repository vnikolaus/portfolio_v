import { Router } from 'express';
import imageController from '../controllers/ImageController';
import autentication from '../middlewares/autentication';

const router = new Router();

router.post('/', autentication, imageController.store); // "imgStock" -> nome do campo setado no insomnia;

export default router;
