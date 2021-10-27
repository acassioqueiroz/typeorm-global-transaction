import IAccountsRepository from '../../repositories/IAccountsRepository';
import Account from '../entities/Account';
import GlobalTransactionRepository from './GlobalTransactionRepository';

export default class AccountsRepository
  extends GlobalTransactionRepository<Account>
  implements IAccountsRepository
{
  constructor() {
    super(Account);
  }

  public async create(account: Partial<Account>): Promise<Account> {
    const accountToCreate = this.ormRepository.create(account);
    return this.ormRepository.save(accountToCreate);
  }
}
