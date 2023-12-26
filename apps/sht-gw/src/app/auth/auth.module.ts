import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthResolver } from './resolver';
import { AuthService } from './service';
import { AuthProcessor } from './processor';

@Module({
  imports: [HttpModule],
  providers: [AuthResolver, AuthService, AuthProcessor],
  exports: [],
})
export class AuthModule {}
