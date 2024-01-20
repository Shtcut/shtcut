import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import { ResponseFilter, ValidationPipe } from 'shtcut/core';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
    cors: true,
    bodyParser: true,
  });

  const config = app.get(ConfigService);
  const apiVersions = config.get('app.api.versions') as string[];
  const currentVersion = apiVersions.pop();

  app.use(morgan('tiny'));
  app.use(requestIp.mw());
  app.setGlobalPrefix(`api/${currentVersion}`);
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.get('app.port'), () =>
    Logger.log(`${config.get('app.serviceName')} Running 👍: ` + `${config.get('app.baseUrl')}`),
  );
}

bootstrap();
