import { Controller, Logger } from '@nestjs/common';
import { EmailService } from './service';
import { EmailJob, QueueTasks } from 'shtcut/core';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MessageController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern(QueueTasks.PING)
  public async ping(payload) {
    Logger.log(`Ping: ${JSON.stringify(payload)}`);
  }
  @EventPattern(QueueTasks.SEND_EMAIL)
  public async sendEmail(emailJob: EmailJob) {
    Logger.log(`Received - Send email: ${JSON.stringify(emailJob)}`);
    await this.emailService.sendEmail(emailJob);
    const payload = {
      queueTask: QueueTasks.SEND_EMAIL,
      body: {
        jobId: emailJob.id,
        subject: emailJob.subject,
        receiver: Array.isArray(emailJob.to) ? emailJob.to.map((v) => v.email) : emailJob.to.email,
      },
    };
    Logger.log(`Send email-payload: ${JSON.stringify(payload)}`);
  }
}
