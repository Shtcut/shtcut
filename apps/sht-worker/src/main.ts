import { NestFactory } from '@nestjs/core';
import { ShtcutWorkerModule } from './sht-worker.module';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import { LoggingInterceptor, ResponseFilter, ValidationPipe, WorkerExceptionFilter } from 'shtcut/core';

async function bootstrap() {
  const app = await NestFactory.create(ShtcutWorkerModule, {
    cors: true,
    logger: process.env.NODE_ENV === 'development' ? ['debug'] : ['error', 'warn', 'debug'],
  });

  const config = app.get(ConfigService);
  app.use(morgan('tiny'));
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new WorkerExceptionFilter());
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
}

bootstrap();
