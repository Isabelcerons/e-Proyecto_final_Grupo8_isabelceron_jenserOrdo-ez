import express from 'express';
import UserRouter from './users/users.route';
import errorMiddleware from './filters/exception.middleware';
import RoleRouter from './users/roles.route';

const app = express();

app.use(express.json());
app.use('/users', UserRouter);
app.use('/roles', RoleRouter);
app.use(errorMiddleware);

export default app;
