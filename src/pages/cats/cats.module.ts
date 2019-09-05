import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '../../core/middlewares/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CATS_STORE',
      useValue: [
        {
          name: 'tom',
          age: 3,
          breed: 'british',
          id: 0,
        },
      ],
    },
    CatsService,
  ],
})
export class CatsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
