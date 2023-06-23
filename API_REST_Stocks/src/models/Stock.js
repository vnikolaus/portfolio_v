import Sequelize, { Model } from 'sequelize';
import Image from './Image';

export default class Stock extends Model {
  static init(sequelize) {
    super.init(
      {
        symbol: {
          type: Sequelize.STRING,
          defaultValue: null,
          allowNull: false,
          unique: true,
          validate: {
            len: {
              arguments: [4, 5],
              msg: 'Symbol must have be between 4 - 5 characters',
            },
          },
        },
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: true,
          validate: {
            len: {
              arguments: [3, 140],
              msg: 'Name must have be between 3 - 140 characters',
            },
          },
        },
        price: {
          type: Sequelize.FLOAT,
          defaultValue: null,
          allowNull: false,
          validate: {
            isFloat: true,
          },
        },
        variation: {
          type: Sequelize.FLOAT,
          defaultValue: 0.00,
          validate: {
            isFloat: true,
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(model) {
    this.hasMany(model.Image, { foreignKey: 'id_stock' });
  }
}
