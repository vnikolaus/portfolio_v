import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['name'] }); // retorna somente o id, nome e email dos usuarios
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.userId;
      if (!id) return res.json({ errors: 'Invalid ID' });
      const user = await User.findByPk(id);
      if (!user) throw new Error('User not exists');
      const updated = await user.update(req.body);
      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;
      if (!id) return res.json({ errors: 'Invalid ID' });
      const user = await User.findByPk(id);
      if (!user) return res.json({ errors: 'User not exists' });
      await user.destroy();
      return res.json({ msg: 'User excluded' });
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }
}

export default new UserController();
