import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { token_key } = req.headers;

  if (!token_key) return res.status(401).json({ erros: 'User needs to login' });

  const [, token] = token_key.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET); // verifica o token do usuario
    const { id, email } = data;

    const user = await User.findOne({ // retorna um registro do BD
      where: {
        id,
        email,
      },
    });

    if (!user) return res.status(401).json({ erros: 'Invalid user' });
    req.userId = id; // captura o id e email e vincula diretamente na requisição
    req.userEmail = email;
    return next();
  } catch (err) {
    return res.status(401).json({ erros: 'Invalid Token' });
  }
};
