import IGlobalTransactionProvider from '../models/IGlobalTransactionProvider';
import ITransaction from '../models/ITransaction';
import TypeormTransaction from './TypeormTransaction';

export default class TypeormGlobalTransactionProvider
  implements IGlobalTransactionProvider
{
  public async createNewTransaction(): Promise<ITransaction> {
    const typeormTransaction = new TypeormTransaction();
    return typeormTransaction;
  }
}
