import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { IConfigService } from './config-service.interface';

export class ConfigService implements IConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  public get dbUri(): string {
    return this.get('DATABASE_URL_PREFIX')
      + `${this.get('DATABASE_USER')}:${this.get('DATABASE_PASSWORD')}@`
      + this.get('DATABASE_URL_HOST')
      + `/${this.get('DATABASE_NAME')}`;
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
