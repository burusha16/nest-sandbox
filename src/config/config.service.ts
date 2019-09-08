import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  public get dbConfig(): { user: string, password: string } {
    return {
      user: this.get('DATABASE_USER'),
      password: this.get('DATABASE_PASSWORD'),
    };
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
