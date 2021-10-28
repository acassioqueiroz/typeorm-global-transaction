import { EntityTarget, getRepository, Repository } from 'typeorm';
import TypeormTransaction, {
  TransactionCallbackFunction,
  TransactionEvents,
} from '../implementations/TypeormTransaction';

export default class GlobalTransactionRepository<T = any> {
  protected ormRepository: Repository<T>;

  private entityClass: EntityTarget<T>;

  constructor(entityClass: EntityTarget<T>) {
    this.entityClass = entityClass;
    this.ormRepository = getRepository(entityClass);
  }

  private transaction: TypeormTransaction;

  public useGlobalTransaction(transaction: TypeormTransaction): void {
    if (!transaction) {
      return;
    }
    this.transaction = transaction;
    const queryRunner = this.transaction.getQueryRunner();
    this.ormRepository = queryRunner.manager.getRepository(this.entityClass);
  }

  public on(
    event: TransactionEvents,
    callback: TransactionCallbackFunction,
  ): void {
    if (this.transaction) {
      this.transaction.on(event, callback);
    } else if (event === 'commit') {
      callback();
    }
  }

  public getTransactionId(): string {
    return this.transaction ? this.transaction.transactionId : 'no_transaction';
  }
}
