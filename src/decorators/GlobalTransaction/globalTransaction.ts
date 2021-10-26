/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */

import ITransactional from 'services/ITransactional';
import ITransaction from '../../providers/GlobalTransactionProvider/models/ITransaction';

/* eslint-disable @typescript-eslint/no-unused-vars */
const globalTranasction =
  () =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
    // getting class target
    const classTarget = target.constructor;

    // descriptor change method
    const originalMethod = descriptor.value;
    descriptor.value = function (transaction: ITransaction) {
      console.log(`passei aqui`);

      const transactionalItems: string[] =
        Reflect.getMetadata('useTransaction', classTarget) || [];
      transactionalItems.forEach((item) => {
        const transactionalInstance = this[item];
        transactionalInstance.useGlobalTransaction(transaction);
      });

      console.log(`transactionalItems ${transactionalItems}`);

      const result = originalMethod.apply(target, transaction);
    };
  };

export default globalTranasction;
