import { inject, injectable } from 'tsyringe';
import globalTransaction from '../decorators/GlobalTransaction/globalTransaction';
import useTransaction from '../decorators/GlobalTransaction/transaction';
import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';
import ICreditCardsRepository from '../repositories/ICreditCardsRepository';
import CreditCard from '../typeorm/entities/CreditCard';

interface IRequest {
  number: string;
  limit: number;
}

@injectable()
class CreateCreditCardService {
  private transaction: ITransaction;

  // @globalTransaction()
  public useGlobalTransaction(transaction: ITransaction): void {
    this.transaction = transaction;
  }

  constructor(
    @useTransaction('creditCardsRepository')
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository
  ) {}

  public async execute({ number, limit }: IRequest): Promise<CreditCard> {
    const createdCreditCard = await this.creditCardsRepository.create({
      number,
      limit,
    });

    return createdCreditCard;
  }
}

export default CreateCreditCardService;
