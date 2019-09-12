import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { mongooseConfigProvider } from './core/database/database.providers';
import { CatsModule } from './pages/cats/cats.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync(mongooseConfigProvider),
    CatsModule,
  ]
})
export class AppModule {
}
