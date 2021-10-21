import { inject, injectable } from 'tsyringe';
import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';
import ICreditCardsRepository from '../repositories/ICreditCardsRepository';
import CreditCard from '../typeorm/entities/CreditCard';

interface IRequest {
  number: string;
  limit: number;
}

@injectable()
class CreateCreditCardService {
  constructor(
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository
  ) {}

  public useGlobalTransaction(transaction: ITransaction): void {
    this.creditCardsRepository.useGlobalTransaction(transaction);
  }

  public async execute({ number, limit }: IRequest): Promise<CreditCard> {
    console.log(
      `creditCardsRepository.instanceId ${this.creditCardsRepository.getInstanceId()}`
    );

    const createdCreditCard = await this.creditCardsRepository.create({
      number,
      limit,
    });

    return createdCreditCard;
  }
}

export default CreateCreditCardService;
