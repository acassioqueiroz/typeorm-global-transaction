import { getConnection, QueryRunner } from 'typeorm';
import ITransaction from '../models/ITransaction';

export default class TypeormTransaction implements ITransaction {
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
  }

  public async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }

  public async release(): Promise<void> {
    await this.queryRunner.release();
  }

  public getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }
}
