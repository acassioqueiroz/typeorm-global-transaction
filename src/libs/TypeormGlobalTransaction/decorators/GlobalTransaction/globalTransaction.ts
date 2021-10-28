/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { v4 as uuid } from 'uuid';

import TypeormTransaction from '@libs/TypeormGlobalTransaction/implementations/TypeormTransaction';

const globalTranasction =
  () =>
  (constructor: Function): void => {
    const target: any = constructor;

    Object.defineProperty(target.prototype, 'transaction', {
      value: undefined,
      writable: true,
    });

    const transactionalItems: string[] =
      Reflect.getOwnMetadata('useTransaction', target.prototype.constructor) ||
      [];

    Object.defineProperty(target.prototype, 'markedToUseGlobalTransaction', {
      value: true,
    });

    Object.defineProperty(target.prototype, 'useGlobalTransaction', {
      value(transaction: TypeormTransaction): void {
        if (this.transaction !== undefined) {
          return;
        }
        this.transaction = transaction;
      },
    });
  };

export default globalTranasction;
