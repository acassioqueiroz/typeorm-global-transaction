import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';
import useTransaction from '../decorators/GlobalTransaction/transaction';

export default abstract class TransactionalService {
  protected transaction: ITransaction;

  public useGlobalTransaction(
    @useTransaction('accountsRepository333') transaction: ITransaction
  ): void {
    this.transaction = transaction;
    let target = Object.getPrototypeOf(this);
    while (target !== Object.prototype) {
      const metadata = Reflect.getOwnMetadata('useTransaction', target);
      console.log(`metadata: ${metadata}`);
      target = Object.getPrototypeOf(target);
    }
  }
}
