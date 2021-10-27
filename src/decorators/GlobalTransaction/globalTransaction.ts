/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ITransaction from '../../providers/GlobalTransactionProvider/models/ITransaction';

const globalTranasction =
  () =>
  (constructor: Function): void => {
    const target: any = constructor;

    const transactionalItems: string[] =
      Reflect.getOwnMetadata('useTransaction', target.prototype.constructor) ||
      [];

    Object.defineProperty(target.prototype, 'useGlobalTransaction', {
      value(transaction: ITransaction) {
        transactionalItems.forEach((item) => {
          this[item].useGlobalTransaction(transaction);
        });
        this.transaction = transaction;
      },
    });
  };

export default globalTranasction;
