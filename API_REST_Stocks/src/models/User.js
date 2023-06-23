import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo deve conter entre 3 e 255 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email invalido.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Password have to be between 6 - 50 characters.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => { // adiciona um 'hook' antes de salvar o usuario;
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 6); // gera o hash da senha do usuario;
      }
    });
    return this;
  }

  validPassword(password) {
    return bcryptjs.compare(password, this.password_hash); // compara a senha do usuario com o hash gerado, para confirmar a autenticação;
  }
}
