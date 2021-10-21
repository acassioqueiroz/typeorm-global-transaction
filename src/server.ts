import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './typeorm';

import routes from './routes';
import './container';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3001, () => {
  console.log('Listen 3001 port.');
});
