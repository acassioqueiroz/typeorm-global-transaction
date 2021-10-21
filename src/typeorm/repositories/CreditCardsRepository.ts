import ICreditCardsRepository from '../../repositories/ICreditCardsRepository';
import CreditCard from '../entities/CreditCard';
import GlobalTransactionRepository from './GlobalTransactionRepository';

export default class CreditCardsRepository
  extends GlobalTransactionRepository<CreditCard>
  implements ICreditCardsRepository
{
  public async create(creditCard: Partial<CreditCard>): Promise<CreditCard> {
    const creditCardToCreate =
      this.getOrmRepository(CreditCard).create(creditCard);
    return this.getOrmRepository(CreditCard).save(creditCardToCreate);
  }
}
