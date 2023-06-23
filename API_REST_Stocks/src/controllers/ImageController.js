import multer from 'multer';
import multerConfig from '../config/multer';

import Image from '../models/Image';
import Stock from '../models/Stock';

const upload = multer(multerConfig).single('imgStock');

class ImageController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file; // req -> informações enviada pela url de requisição;
        const { stock_id } = req.body;
        const id_stock = stock_id;
        const stock = await Stock.findByPk(id_stock);

        if (!stock) return res.status(400).json({ errors: ['Stock not found'] });

        const img = await Image.create({ originalname, filename, id_stock });

        return res.json(img);
      } catch (err) {
        return res.status(400).json({
          errors: [err],
        });
      }
    });
  }
}

export default new ImageController();
