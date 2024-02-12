import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth';

@Module({
  imports: [HttpModule, AuthModule],
  providers: [],
  exports: [],
})
export class AppModule {}
