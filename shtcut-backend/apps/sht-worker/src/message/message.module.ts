import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EmailService, NotificationService, SmsService } from './service';
import { MessageController } from './controller/message.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MessageController],
  providers: [EmailService, SmsService, NotificationService],
  exports: [EmailService, SmsService, NotificationService],
})
export class MessageModule {}
