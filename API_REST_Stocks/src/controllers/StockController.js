import Stock from '../models/Stock';
import Image from '../models/Image';

class StockController {
  async list(req, res) {
    try {
      const stocks = await Stock.findAll({
        attributes: ['symbol', 'name', 'price', 'variation', 'updatedAt'],
        order: [['id', 'ASC']],
        include: {
          model: Image,
          attributes: ['url', 'filename'],
        },
      });
      return res.json(stocks);
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }

  async insert(req, res) {
    try {
      const newStock = await Stock.create(req.body);

      return res.json(newStock);
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { symbol } = req.params;
      if (!symbol) return res.status(400).json({ errors: 'Symbol not found' });
      const stock = await Stock.findOne({ where: { symbol } });
      await stock.destroy();

      return res.json({ msg: 'Stock excluded' });
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }

  async update(req, res) {
    try {
      const { symbol } = req.params;
      if (!symbol) return res.status(400).json({ errors: 'Symbol not found' });
      const stock = await Stock.findOne({ where: { symbol } });
      const updatedStock = await stock.update(req.body);

      return res.json({ updatedStock });
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }

  async show(req, res) {
    try {
      const { symbol } = req.params;
      if (!symbol) return res.status(400).json({ errors: 'Symbol not found' });
      const stock = await Stock.findOne({ where: { symbol } });

      const {
        name, price, variation, updatedAt,
      } = stock;

      return res.json({
        symbol, name, price, variation, updatedAt,
      });
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }
}

export default new StockController();
