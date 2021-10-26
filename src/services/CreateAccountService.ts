import { inject, injectable } from 'tsyringe';

import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';
import globalTransaction from '../decorators/GlobalTransaction/globalTransaction';
import useTransaction from '../decorators/GlobalTransaction/transaction';
import IAccountsRepository from '../repositories/IAccountsRepository';
import Account from '../typeorm/entities/Account';
import CreditCard from '../typeorm/entities/CreditCard';
import CreateCreditCardService from './CreateCreditCardService';
import ITransactional from './ITransactional';

interface IRequest {
  number: number;
}

interface IResponse {
  creditCard: CreditCard;
  account: Account;
}

@injectable()
class CreateAccountService implements ITransactional {
  private transaction: ITransaction;

  @globalTransaction()
  public useGlobalTransaction(transaction: ITransaction): void {
    this.transaction = transaction;
  }

  constructor(
    @useTransaction('accountsRepository')
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
    @useTransaction('createCreditCardService')
    @inject(CreateCreditCardService)
    private createCreditCardService: CreateCreditCardService
  ) {}

  public async execute({ number }: IRequest): Promise<IResponse> {
    const createdAccount = await this.accountsRepository.create({
      number,
      balance: 0,
    });

    const cardNumber = Math.floor(Math.random() * 100);
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
