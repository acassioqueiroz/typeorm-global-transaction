import {
  TransactionCallbackFunction,
  TransactionEvents,
} from '../implementations/TypeormTransaction';

export default interface ITransaction {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  release(): Promise<void>;
  release(): Promise<void>;
  on(event: TransactionEvents, callback: TransactionCallbackFunction): void;
}
