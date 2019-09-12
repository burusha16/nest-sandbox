import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../../../src/config/config.service';
import { MongooseConfigService } from '../../../../src/core/database/mongose-config.service';
import { ConfigServiceMock } from '../../../mocks/services/config.service.mock';

describe('MongooseConfigService', () => {
  let service: MongooseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigServiceMock(),
        },
        MongooseConfigService,
      ],
    }).compile();

    service = module.get<MongooseConfigService>(MongooseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create mongoose config', () => {
    expect(service.createMongooseOptions()).toEqual({ uri: 'testURL', useNewUrlParser: true });
  });
});
