import { inject, injectable } from 'tsyringe';

import ITransactional from './ITransactional';
import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';
import globalTransaction from '../decorators/GlobalTransaction/globalTransaction';
import useTransaction from '../decorators/GlobalTransaction/transaction';
import IAccountsRepository from '../repositories/IAccountsRepository';
import Account from '../typeorm/entities/Account';
import CreditCard from '../typeorm/entities/CreditCard';
import CreateCreditCardService from './CreateCreditCardService';
import TransactionalService from './TransactionalService';

interface IRequest {
  number: number;
}

interface IResponse {
  creditCard: CreditCard;
  account: Account;
}

@injectable()
@globalTransaction()
class CreateAccountService extends TransactionalService {
  constructor(
    @useTransaction('accountsRepository')
    @inject('AccountsRepository')
    public accountsRepository: IAccountsRepository,
    @useTransaction('createCreditCardService')
    @inject(CreateCreditCardService)
    public createCreditCardService: CreateCreditCardService
  ) {
    super();
  }

  public async execute({ number }: IRequest): Promise<IResponse> {
    const createdAccount = await this.accountsRepository.create({
      number,
      balance: 0,
    });

    const cardNumber = Math.floor(Math.random() * 10000);
    console.log(`#### Account: ${number} -> Card ${cardNumber}`);

    const createdCreditCard = await this.createCreditCardService.execute({
      number: cardNumber.toString(),
      limit: 2000,
    });

    return {
      account: createdAccount,
      creditCard: createdCreditCard,
    };
  }
}

export default CreateAccountService;
