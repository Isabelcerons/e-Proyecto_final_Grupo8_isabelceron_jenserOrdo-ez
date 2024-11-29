import express from 'express';
import UserRouter from './users/users.route';
import errorMiddleware from './filters/exception.middleware';
import RoleRouter from './users/roles.route';
import CategoriesRouter from './ecommerce/cateogires.route';
import ProductRouter from './ecommerce/product.route';

const app = express();

app.use(express.json());
app.use('/users', UserRouter);
app.use('/roles', RoleRouter);
app.use('/products', ProductRouter);
app.use('/categories', CategoriesRouter);
app.use(errorMiddleware);

export default app;
