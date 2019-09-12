import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {
  }

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.dbUri,
      useNewUrlParser: true
    };
  }
}
