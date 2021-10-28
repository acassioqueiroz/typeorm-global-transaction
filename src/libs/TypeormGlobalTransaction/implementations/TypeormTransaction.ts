/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConnection, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';

type TransactionEvents = 'commit' | 'rollback';
type TransactionCallbackFunction = () => void | Promise<void>;
type CallbackFunctions = {
  commit: TransactionCallbackFunction[];
  rollback: TransactionCallbackFunction[];
  release: TransactionCallbackFunction[];
};

export default class TypeormTransaction {
  public transactionId = uuid();

  private callbackFunctions: CallbackFunctions = {
    commit: [],
    rollback: [],
    release: [],
  };

  private queryRunner: QueryRunner;

  constructor() {
    const connection = getConnection();
    this.queryRunner = connection.createQueryRunner();
  }

  private async runCallbackFunctionsSequenctially(
    callbacks: TransactionCallbackFunction[],
  ): Promise<void> {
    for (const callback of callbacks) {
      const result = callback();
      // check is result is a promise
      if (result && result.then) {
        console.log(`#### waiting for promise result`);
        await result;
      }
    }
  }

  public async startTransaction(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  public async commitTransaction(): Promise<void> {
    await this.queryRunner.commitTransaction();
    this.runCallbackFunctionsSequenctially(this.callbackFunctions.commit);
  }

  public async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
    console.log(`rollback ${this.callbackFunctions.rollback.length}`);
    this.runCallbackFunctionsSequenctially(this.callbackFunctions.rollback);
  }

  public async release(): Promise<void> {
    await this.queryRunner.release();
    this.runCallbackFunctionsSequenctially(this.callbackFunctions.release);
  }

  public getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }

  public on(
    event: TransactionEvents,
    callback: TransactionCallbackFunction,
  ): void {
    this.callbackFunctions[event].push(callback);
  }

  public apply(object: any): void {
    object.transaction = this;
  }
}

export { TransactionEvents, TransactionCallbackFunction, CallbackFunctions };
