import { container } from 'tsyringe';

import '../providers';

import AccountsRepository from '../typeorm/repositories/AccountsRepository';
import CreditCardsRepository from '../typeorm/repositories/CreditCardsRepository';

container.register('AccountsRepository', AccountsRepository);
container.register('CreditCardsRepository', CreditCardsRepository);
