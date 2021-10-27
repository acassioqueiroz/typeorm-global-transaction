/* eslint-disable @typescript-eslint/no-this-alias */
import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';

export default abstract class TransactionalService {
  protected transaction: ITransaction;

  public useGlobalTransaction(transaction: ITransaction): void {}
}
