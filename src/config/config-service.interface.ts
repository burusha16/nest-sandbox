export interface IConfigService {
  dbUri: string;

  get(name: string): string;
}
