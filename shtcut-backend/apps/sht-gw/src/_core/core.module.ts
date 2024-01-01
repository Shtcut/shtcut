import { ApolloDriver } from '@nestjs/apollo';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { POST } from 'shtcut/core';
import { processServiceError } from './index';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [HttpModule],
      driver: ApolloDriver,
      useFactory: async (http: HttpService, config: ConfigService) => {
        return {
          driver: ApolloDriver,
          autoSchemaFile: './apps/sht-gw/src/schema.gql',
          useGlobalPrefix: true,
          playground: true,
          installSubscriptionHandlers: false,
          context: async ({ req, ...rest }) => {
            if (req.headers['authorization']) {
              try {
                const serviceUrl = config.get('microService.app.url');
                const { data } = await lastValueFrom(
                  http.request({
                    url: `${serviceUrl}/auth/authenticate`,
                    method: POST,
                    headers: {
                      authorization: req.headers['authorization'],
                      'x-api-key': req.header['x-api-key'],
                    },
                  }),
                );
                req.useId = data.data._id;
                req.user = data.data;
              } catch (e) {
                return processServiceError(e);
              }
            }
            return {
              ...rest,
              userId: req.user?._id,
              user: req.user,
              headers: req.headers,
            };
          },
        };
      },
      inject: [HttpService, ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
