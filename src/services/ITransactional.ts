import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';

export default interface ITransactional {
  useGlobalTransaction(transaction: ITransaction): void;
}
