import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './typeorm/container';

import routes from './routes';
import './container';
import {
  globalTransactionErrorMiddleware,
  globalTransactionMiddleware,
} from './middlewares/globalTransactionMiddleware';

const app = express();

app.use(express.json());

app.use(globalTransactionMiddleware);
app.use(routes);
app.use(globalTransactionErrorMiddleware);

app.listen(3001, () => {
  console.log('Listen 3001 port.');
});
