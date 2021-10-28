declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    globalTransaction: TypeormGlobalTransaction;
    error?: Error;
  }
}
