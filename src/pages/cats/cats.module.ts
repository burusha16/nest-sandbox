import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../../core/middlewares/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CATS_SCHEMA } from './shared/schemas/cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cat', schema: CATS_SCHEMA, collection: 'cats' }])
  ],
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
