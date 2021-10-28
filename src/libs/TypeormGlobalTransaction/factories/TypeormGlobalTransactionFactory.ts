import TypeormTransaction from '../implementations/TypeormTransaction';

export default abstract class TypeormGlobalTransactionFactory {
  public static async createNewTransaction(): Promise<TypeormTransaction> {
    const typeormTransaction = new TypeormTransaction();
    return typeormTransaction;
  }
}
