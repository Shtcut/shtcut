import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { RedisModule } from './worker';

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
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        host: config.get('app.redis.host'),
        port: config.get('app.redis.port'),
        password: config.get('app.redis.password'),
        db: 0,
      }),
      inject: [ConfigService],
    }),
    AzureStorageModule.withConfigAsync({
      useFactory: async (config: ConfigService) => {
        return {
          sasKey: `${config.get('app.fileUpload.azure.sasKey')}`,
          accountName: `${config.get('app.fileUpload.azure.accountName')}`,
          containerName: `${config.get('app.fileUpload.azure.containerName')}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
