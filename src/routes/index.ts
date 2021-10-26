import { Router } from 'express';
import IGlobalTransactionProvider from 'providers/GlobalTransactionProvider/models/IGlobalTransactionProvider';
import { container } from 'tsyringe';
import CreateAccountService from '../services/CreateAccountService';

const routes = Router();

routes.post('/account', async (request, response) => {
  const createAccountService = container.resolve(CreateAccountService);

  createAccountService.useGlobalTransaction(request.globalTransaction);

  const number = Math.floor(Math.random() * 200000);

  const createdAccount = await createAccountService.execute({ number });

  return response.json(createdAccount);
});

export default routes;
