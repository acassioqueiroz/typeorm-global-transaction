import { container } from 'tsyringe';
import TypeormGlobalTransactionProvider from './GlobalTransactionProvider/implementations/TypeormGlobalTransactionProvider';

container.registerSingleton(
  'GlobalTransactionProvider',
  TypeormGlobalTransactionProvider
);
