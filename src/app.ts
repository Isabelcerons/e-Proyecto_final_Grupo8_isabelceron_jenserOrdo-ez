import express from 'express';
import UserRouter from './users/users.route';
import errorMiddleware from './middelwares/exception.middleware';
import RoleRouter from './users/roles.route';
import CategoriesRouter from './ecommerce/cateogires.route';
import ProductRouter from './ecommerce/product.route';
import { AuthMiddleware } from './middelwares/auth.middleware';
import SignRouters from './auth/auth.route';

const app = express();

app.use(express.json());
app.use('/auth', SignRouters);
app.use('/users', UserRouter);
app.use('/roles', AuthMiddleware, RoleRouter);
app.use('/products', AuthMiddleware, ProductRouter);
app.use('/categories', AuthMiddleware, CategoriesRouter);
app.use(errorMiddleware);

export default app;
