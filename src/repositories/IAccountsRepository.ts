import Account from '../typeorm/entities/Account';
import { IGlobalTransactionRepository } from './IGlobalTransactionRepository';

export default interface IAccountsRepository
  extends IGlobalTransactionRepository {
  create(account: Partial<Account>): Promise<Account>;
}
