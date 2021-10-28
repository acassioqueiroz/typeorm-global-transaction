/* eslint-disable consistent-return */
import TypeormTransaction, {
  TransactionCallbackFunction,
  TransactionEvents,
} from './TypeormTransaction';

export default class TransactionManager {
  transaction: TypeormTransaction | undefined;

  public on(
    event: TransactionEvents,
    callback: TransactionCallbackFunction,
  ): void {
    if (this.transaction) {
      return this.transaction.on(event, callback);
    }
    if (event === 'commit') {
      console.log(`no transaction. Running immediatally`);
      callback();
    }
  }
}
