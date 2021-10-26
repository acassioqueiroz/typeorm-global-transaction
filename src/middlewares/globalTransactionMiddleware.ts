import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import IGlobalTransactionProvider from '../providers/GlobalTransactionProvider/models/IGlobalTransactionProvider';

const globalTransactionMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const globalTransactionProvider =
    container.resolve<IGlobalTransactionProvider>('GlobalTransactionProvider');

  const globalTransaction =
    await globalTransactionProvider.createNewTransaction();
  await globalTransaction.startTransaction();

  request.globalTransaction = globalTransaction;

  response.on('finish', async () => {
    if (request.error) {
      await globalTransaction.rollbackTransaction();
    } else {
      await globalTransaction.commitTransaction();
    }
    await globalTransaction.release();
  });

  return next();
};

const globalTransactionErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
): Response<any, Record<string, any>> => {
  request.error = error;

  console.error(error.stack);
  return response.json({ error: error.message });
};

export { globalTransactionMiddleware, globalTransactionErrorMiddleware };
