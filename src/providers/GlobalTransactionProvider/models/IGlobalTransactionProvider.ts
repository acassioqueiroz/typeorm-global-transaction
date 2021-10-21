import ITransaction from './ITransaction';

export default interface IGlobalTransactionProvider {
  createNewTransaction(): Promise<ITransaction>;
}
