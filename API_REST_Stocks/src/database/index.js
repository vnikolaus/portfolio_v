import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Stock from '../models/Stock';
import User from '../models/User';
import Image from '../models/Image';

const models = [Stock, User, Image]; // Importante passar no array TODOS os models criados;

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models)); // se existe algum model com a function associate, execula ela;
