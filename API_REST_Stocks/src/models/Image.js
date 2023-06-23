import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Image extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: false,
          validate: {
            notEmpty: {
              msg: 'Field is not to be empty',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: false,
          validate: {
            notEmpty: {
              msg: 'Field is not to be empty',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/img/${this.getDataValue('filename')}`; // 'getDataValue -> captura os dados dos campos no objeto;
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
    this.belongsTo(model.Stock, { foreignKey: 'id_stock' }); // 'belongsTo' -> esse model pertence ao model "Stock", pela sua FK 'stock_id';
  }
}
