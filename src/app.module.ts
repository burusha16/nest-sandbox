import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './pages/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
})
export class AppModule {
}
