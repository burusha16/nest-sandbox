import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './pages/cats/cats.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [CatsModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {
}
