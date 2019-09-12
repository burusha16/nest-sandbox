export class ModelExecResolveMock<T> {
  constructor(private data: T) {
  }

  public exec(): Promise<T> {
    return Promise.resolve(this.data);
  }
}
