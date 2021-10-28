/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import TypeormTransaction from './TypeormTransaction';

export default abstract class TransactionalService {
  protected transaction: TypeormTransaction;

  public useGlobalTransaction(transaction: TypeormTransaction): void {}
}
