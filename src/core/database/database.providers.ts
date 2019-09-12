import * as mongoose from 'mongoose';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { MongooseConfigService } from './mongose-config.service';

export const databaseConnection = {
  provide: 'DATABASE_CONNECTION',
  imports: [ConfigModule],
  useFactory: (configService: ConfigService): Promise<typeof mongoose> => mongoose.connect(configService.dbUri),
  inject: [ConfigService],
};

export const mongooseConfigProvider = {
  imports: [ConfigModule],
  useClass: MongooseConfigService,
  inject: [ConfigService],
};
