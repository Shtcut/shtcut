import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { RequestIpModule } from './request-ip.module';
import { RedisModule } from './worker';

@Global()
@Module({
  imports: [
    HttpModule,
    ConfigModule,
    RequestIpModule,
    RedisModule,
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService): MongooseModuleFactoryOptions => {
        return {
          uri: config.get('app.mongodb.url'),
        };
      },
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
