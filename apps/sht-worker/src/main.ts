import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { LoggingInterceptor, ResponseFilter, ValidationPipe, WorkerExceptionFilter } from 'shtcut/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: process.env.NODE_ENV === 'development' ? ['debug'] : ['error', 'warn', 'debug'],
  });

  app.use(morgan('tiny'));
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new WorkerExceptionFilter());
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = app.get(ConfigService);
  const port = config.get(`app.port`);
  await app.listen(config.get('app.port'), () =>
    Logger.log(`${config.get('app.serviceName')} Running 👍: ` + `${config.get('app.baseUrl')}`),
  );
}

bootstrap();
