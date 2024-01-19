import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { CoreModule } from '../../../libs/core/src/core.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { configuration } from '@config';
import { FeatureModule } from './feature';
import { PlanModule } from './plan';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/admin/.env.local', '_env/.env'],
      load: [configuration],
    }),
    CoreModule,
    AdminAuthModule,
    FeatureModule,
    PlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
