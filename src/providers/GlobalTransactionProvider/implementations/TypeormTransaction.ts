import { getConnection, QueryRunner } from 'typeorm';
import ITransaction from '../models/ITransaction';

type TransactionEvents = 'commit' | 'rollback';
type TransactionCallbackFunction = () => void;
type CallbackFunctions = {
  commit: TransactionCallbackFunction[];
  rollback: TransactionCallbackFunction[];
  release: TransactionCallbackFunction[];
};

export default class TypeormTransaction implements ITransaction {
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

  public async startTransaction(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  public async commitTransaction(): Promise<void> {
    await this.queryRunner.commitTransaction();
    this.callbackFunctions.commit.forEach((callback) => callback());
  }

  public async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
    console.log(`rollback ${this.callbackFunctions.rollback.length}`);
    this.callbackFunctions.rollback.forEach((callback) => callback());
  }

  public async release(): Promise<void> {
    await this.queryRunner.release();
    this.callbackFunctions.release.forEach((callback) => callback());
  }

  public getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }

  public on(
    event: TransactionEvents,
    callback: TransactionCallbackFunction
  ): void {
    this.callbackFunctions[event].push(callback);
  }
}

export { TransactionEvents, TransactionCallbackFunction, CallbackFunctions };
