import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../../src/config/config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(`./environment/test.env`),
        },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get DATABASE_USER, DATABASE_PASSWORD', () => {
    expect(service.get('DATABASE_USER')).toEqual('catstest');
    expect(service.get('DATABASE_PASSWORD')).toEqual('catstestpass');
  });

  it('should return dbUri', () => {
    const url = 'mongodb://catstest:catstestpass@127.0.0.1:27017/cats';
    expect(service.dbUri).toEqual(url);
  });
});
