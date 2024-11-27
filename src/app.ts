import express from 'express';
import UserRouter from './users/users.route';

const app = express();

app.use(express.json());
app.use('/users', UserRouter);

export default app;
