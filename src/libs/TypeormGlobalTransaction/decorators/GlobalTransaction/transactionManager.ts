/* eslint-disable */

const useTransactionManager =
  () =>
  (target: any, propertyKey: string | symbol): any => {
    Reflect.defineMetadata('useTransactionManager', propertyKey, target);
  };

export default useTransactionManager;
