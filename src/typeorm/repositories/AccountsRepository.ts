import IAccountsRepository from '../../repositories/IAccountsRepository';
import Account from '../entities/Account';
import GlobalTransactionRepository from './GlobalTransactionRepository';

export default class AccountsRepository
  extends GlobalTransactionRepository<Account>
  implements IAccountsRepository
{
  public async create(account: Partial<Account>): Promise<Account> {
    const accountToCreate = this.getOrmRepository(Account).create(account);
    return this.getOrmRepository(Account).save(accountToCreate);
  }
}
