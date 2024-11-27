import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { UsersModel } from './models/users.model';
import { PeopleModel } from './models/people.model';
import { RolesModel } from './models/roles.model';
import { UserRolesModel } from './models/userRoles.model';
import logger from '../logger';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [UsersModel, PeopleModel, RolesModel, UserRolesModel],
  port: Number(process.env.DB_PORT),
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    logger.info('Base de datos sincronizada correctamente');
  } catch (error) {
    logger.error('Error al sincronizar la base de datos:', error);
  }
})();