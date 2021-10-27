/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */

import ITransaction from '../../providers/GlobalTransactionProvider/models/ITransaction';

/* eslint-disable @typescript-eslint/no-unused-vars */
const globalTranasction =
  () =>
  (constructor: Function): void => {
    const target: any = constructor;

    const { useGlobalTransaction } = target.prototype;

    const transactionalItems: string[] =
      Reflect.getOwnMetadata('useTransaction', target.prototype.constructor) ||
      [];

    Object.defineProperty(target.prototype, 'useGlobalTransaction', {
      value(transaction: ITransaction) {
        transactionalItems.forEach((item) => {
          this[item].useGlobalTransaction(transaction);
        });
        return useGlobalTransaction.apply(this, transaction);
      },
    });
  };

export default globalTranasction;
