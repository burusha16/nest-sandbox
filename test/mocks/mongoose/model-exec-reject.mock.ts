export class ModelExecRejectMock<T> {
  constructor(private data: T) {
  }

  public exec(): Promise<T> {
    return Promise.reject(this.data);
  }
}
