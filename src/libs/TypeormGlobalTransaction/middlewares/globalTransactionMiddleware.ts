import { NextFunction, Request, Response } from 'express';
import TypeormGlobalTransactionFactory from '../factories/TypeormGlobalTransactionFactory';

const globalTransactionMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const globalTransaction =
    await TypeormGlobalTransactionFactory.createNewTransaction();

  await globalTransaction.startTransaction();

  request.globalTransaction = globalTransaction;

  response.on('finish', async () => {
    if (request.error) {
      console.log('Rolling back transaction');
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
  next: NextFunction,
): void => {
  request.error = error;
  next(error);
};

export { globalTransactionMiddleware, globalTransactionErrorMiddleware };
