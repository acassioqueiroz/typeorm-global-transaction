/* eslint-disable */

const propagateTransaction =
  () =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const currentInstance: any = this;
      const useTransactionManager = Reflect.getOwnMetadata(
        'useTransactionManager',
        target,
      );
      if (currentInstance[useTransactionManager]) {
        currentInstance[useTransactionManager].transaction =
          currentInstance.transaction;
      }

      const transactionalItems: string[] =
        Reflect.getOwnMetadata('useTransaction', target.constructor) || [];

      transactionalItems.reverse().forEach((item) => {
        if (!currentInstance[item]) {
          throw Error(
            `Failed to inject transaction on property ${item} in ${target.constructor.name}. The property is undefined.`,
          );
        }
        if (!currentInstance.transaction) {
          return;
        }
        if (!currentInstance[item].useGlobalTransaction) {
          throw Error(
            `Failed to inject transaction on property ${item} in ${target.constructor.name}.`,
          );
        }
        currentInstance[item].useGlobalTransaction(currentInstance.transaction);
      });

      return originalMethod.apply(this, args);
    };
  };

export default propagateTransaction;
