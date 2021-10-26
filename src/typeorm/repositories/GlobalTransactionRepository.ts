import { EntityTarget, getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import TypeormTransaction from '../../providers/GlobalTransactionProvider/implementations/TypeormTransaction';
import { IGlobalTransactionRepository } from '../../repositories/IGlobalTransactionRepository';

export default class GlobalTransactionRepository<T = any>
  implements IGlobalTransactionRepository
{
  constructor() {
    this.instanceId = uuid();
  }

  private instanceId: string;

  private transaction: TypeormTransaction;

  public useGlobalTransaction(transaction: TypeormTransaction): void {
    console.log(`useGlobalTransaction has been called`);
    this.transaction = transaction;
  }

  protected getOrmRepository(entityClass: EntityTarget<T>): Repository<T> {
    if (!this.transaction) {
      return getRepository(entityClass);
    }
    const queryRunner = this.transaction.getQueryRunner();
    return queryRunner.manager.getRepository(entityClass);
  }

  public getInstanceId(): string {
    return this.instanceId;
  }
}
