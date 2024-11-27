import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { UsersModel } from './models/users.model';
import { resolve } from 'path';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [UsersModel],
  port: Number(process.env.DB_PORT),
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
})();
