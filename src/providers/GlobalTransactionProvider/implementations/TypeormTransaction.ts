import { getConnection, QueryRunner } from 'typeorm';
import ITransaction from '../models/ITransaction';

export default class TypeormTransaction implements ITransaction {
  private queryRunner: QueryRunner;

  constructor() {
    console.log(`createQueryRunner`);
    const connection = getConnection();
    this.queryRunner = connection.createQueryRunner();
  }

  public async startTransaction(): Promise<void> {
    console.log(`TypeormTransaction: startTransaction`);
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  public async commitTransaction(): Promise<void> {
    console.log(`TypeormTransaction: commitTransaction`);
    await this.queryRunner.commitTransaction();
  }

  public async rollbackTransaction(): Promise<void> {
    console.log(`TypeormTransaction: rollbackTransaction`);
    await this.queryRunner.rollbackTransaction();
  }

  public async release(): Promise<void> {
    console.log(`TypeormTransaction: release`);
    await this.queryRunner.release();
  }

  public getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }
}
