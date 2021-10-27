import { EntityTarget, getRepository, Repository } from 'typeorm';

import TypeormTransaction from '../../providers/GlobalTransactionProvider/implementations/TypeormTransaction';
import { IGlobalTransactionRepository } from '../../repositories/IGlobalTransactionRepository';

export default class GlobalTransactionRepository<T = any>
  implements IGlobalTransactionRepository
{
  protected ormRepository: Repository<T>;

  private entityClass: EntityTarget<T>;

  constructor(entityClass: EntityTarget<T>) {
    this.entityClass = entityClass;
    this.ormRepository = getRepository(entityClass);
  }

  private instanceId: string;

  private transaction: TypeormTransaction;

  public useGlobalTransaction(transaction: TypeormTransaction): void {
    if (!transaction) {
      return;
    }
    this.transaction = transaction;
    const queryRunner = this.transaction.getQueryRunner();
    this.ormRepository = queryRunner.manager.getRepository(this.entityClass);
  }

  public getInstanceId(): string {
    return this.instanceId;
  }
}
