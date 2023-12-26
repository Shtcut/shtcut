import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
    cors: true,
    bodyParser: true,
  });

  const config = app.get(ConfigService);
  const apiVersions = config.get('app.api.versions') as string[];
  const currentVersion = apiVersions.pop();

  app.use(morgan('tiny'));
  app.setGlobalPrefix(`api/${currentVersion}`);

  await app.listen(config.get('app.port'), () =>
    Logger.log(`${config.get('app.serviceName')} Running 👍: ` + `${config.get('app.baseUrl')}`),
  );
}

bootstrap();
