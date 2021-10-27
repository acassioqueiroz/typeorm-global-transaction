import { inject, injectable } from 'tsyringe';
import globalTransaction from '../decorators/GlobalTransaction/globalTransaction';
import useTransaction from '../decorators/GlobalTransaction/transaction';
import ICreditCardsRepository from '../repositories/ICreditCardsRepository';
import CreditCard from '../typeorm/entities/CreditCard';
import TransactionalService from './TransactionalService';

interface IRequest {
  number: string;
  limit: number;
}

@injectable()
@globalTransaction()
class CreateCreditCardService extends TransactionalService {
  constructor(
    @useTransaction('creditCardsRepository')
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository
  ) {
    super();
  }

  public async execute({ number, limit }: IRequest): Promise<CreditCard> {
    this.transaction.on('commit', () => {
      console.log('Credit card has been created successfully.');
    });

    this.transaction.on('rollback', () => {
      console.log('Credit card has been not created.');
    });

    const createdCreditCard = await this.creditCardsRepository.create({
      number,
      limit,
    });

    return createdCreditCard;
  }
}

export default CreateCreditCardService;
