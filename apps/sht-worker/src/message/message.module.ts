import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EmailService, NotificationService, SmsService } from './service';
import { MessageController } from './controller/message.controller';

@Module({
  imports: [HttpModule],
  controllers: [MessageController],
  providers: [EmailService, SmsService, NotificationService],
  exports: [EmailService, SmsService, NotificationService],
})
export class MessageModule {}
