/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */

import ITransactional from 'services/ITransactional';
import ITransaction from '../../providers/GlobalTransactionProvider/models/ITransaction';

/* eslint-disable @typescript-eslint/no-unused-vars */
const globalTranasction =
  () =>
  (constructor: Function): void => {
    let target: any = constructor;

    const { useGlobalTransaction } = target.prototype;

    const transactionalItems: string[] =
      Reflect.getOwnMetadata('useTransaction', target.prototype.constructor) ||
      [];
    console.log(`transactionalItemsxxx ${transactionalItems}`);
    target = Reflect.getPrototypeOf(target);

    Object.defineProperty(target.prototype, 'useGlobalTransaction', {
      value(transaction: ITransaction) {
        transactionalItems.forEach((item) => {
          const transactionalInstance = this[item];
          transactionalInstance.useGlobalTransaction(transaction);
        });
        return useGlobalTransaction.apply(this, transaction);
      },
    });

    // change method of class by defining prototype m ethod

    // getting class target

    // const target = Reflect.getPrototypeOf(target.constructor);

    // descriptor change method
    // const originalMethod = descriptor.value;
    // descriptor.value = function (transaction: ITransaction) {
    //   console.log(`passei aqui`);

    //   const transactionalItems: string[] =
    //     Reflect.getMetadata('useTransaction', classTarget) || [];
    //   transactionalItems.forEach((item) => {
    //     const transactionalInstance = this[item];
    //     transactionalInstance.useGlobalTransaction(transaction);
    //   });

    //   console.log(`transactionalItems ${transactionalItems}`);

    //   const result = originalMethod.apply(target, transaction);
    // };
  };

export default globalTranasction;
