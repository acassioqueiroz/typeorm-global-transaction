import ICreditCardsRepository from '../../repositories/ICreditCardsRepository';
import CreditCard from '../entities/CreditCard';
import GlobalTransactionRepository from './GlobalTransactionRepository';

export default class CreditCardsRepository
  extends GlobalTransactionRepository<CreditCard>
  implements ICreditCardsRepository
{
  constructor() {
    super(CreditCard);
  }

  public async create(creditCard: Partial<CreditCard>): Promise<CreditCard> {
    const creditCardToCreate = this.ormRepository.create(creditCard);
    return this.ormRepository.save(creditCardToCreate);
  }
}
