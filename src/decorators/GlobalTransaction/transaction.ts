/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable @typescript-eslint/no-unused-vars */
const useTransaction =
  (propertyName: string) =>
  (target: any, propertyKey: string | symbol, parameterIndex: number): any => {
    const existing: string[] =
      Reflect.getOwnMetadata('useTransaction', target) || [];
    existing.push(propertyName);
    Reflect.defineMetadata('useTransaction', existing, target);
  };

export default useTransaction;
