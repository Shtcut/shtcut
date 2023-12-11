import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService): MongooseModuleFactoryOptions => {
        return {
          uri: config.get('app.mongodb.url'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
