import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';

export interface IGlobalTransactionRepository {
  useGlobalTransaction(transaction: ITransaction): void;
  getInstanceId(): string;
}
