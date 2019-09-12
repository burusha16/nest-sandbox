import { IConfigService } from '../../../src/config/config-service.interface';

export class ConfigServiceMock implements IConfigService {
  public dbUri = 'testURL';

  public get(key: string): string {
    return 'TEST';
  }
}
