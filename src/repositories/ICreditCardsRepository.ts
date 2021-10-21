import CreditCard from '../typeorm/entities/CreditCard';
import { IGlobalTransactionRepository } from './IGlobalTransactionRepository';

export default interface ICreditCardsRepository
  extends IGlobalTransactionRepository {
  create(creditCard: Partial<CreditCard>): Promise<CreditCard>;
}
