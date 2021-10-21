import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import ITransaction from '../providers/GlobalTransactionProvider/models/ITransaction';
import IAccountsRepository from '../repositories/IAccountsRepository';
import Account from '../typeorm/entities/Account';
import CreditCard from '../typeorm/entities/CreditCard';
import CreateCreditCardService from './CreateCreditCardService';

interface IRequest {
  number: number;
}

interface IResponse {
  creditCard: CreditCard;
  account: Account;
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
    @inject(CreateCreditCardService)
    private createCreditCardService: CreateCreditCardService
  ) {}

  public useGlobalTransaction(transaction: ITransaction): void {
    this.accountsRepository.useGlobalTransaction(transaction);
    this.createCreditCardService.useGlobalTransaction(transaction);
  }

  public async execute({ number }: IRequest): Promise<IResponse> {
    console.log(
      `accountsRepository.instanceId ${this.accountsRepository.getInstanceId()}`
    );

    const createdAccount = await this.accountsRepository.create({
      number,
      balance: 0,
    });

    const createdCreditCard = await this.createCreditCardService.execute({
      number: uuid(),
      limit: 2000,
    });

    return {
      account: createdAccount,
      creditCard: createdCreditCard,
    };
  }
}

export default CreateAccountService;
