import { Router } from 'express';
import { container } from 'tsyringe';
import IGlobalTransactionProvider from '../providers/GlobalTransactionProvider/models/IGlobalTransactionProvider';
import CreateAccountService from '../services/CreateAccountService';

const routes = Router();

routes.post('/account', async (request, response) => {
  const globalTransactionProvider =
    container.resolve<IGlobalTransactionProvider>('GlobalTransactionProvider');

  const createAccountService = container.resolve(CreateAccountService);

  const globalTransaction =
    await globalTransactionProvider.createNewTransaction();
  await globalTransaction.startTransaction();
  createAccountService.useGlobalTransaction(globalTransaction);

  const { number } = request.body;
  try {
    const createdAccount = await createAccountService.execute({ number });
    await globalTransaction.commitTransaction();
    return response.json(createdAccount);
  } catch (error) {
    await globalTransaction.rollbackTransaction();
    return response.json({ error });
  } finally {
    await globalTransaction.release();
    console.log(`transaction released`);
  }
});

export default routes;
