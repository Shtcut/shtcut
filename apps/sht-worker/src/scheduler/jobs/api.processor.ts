import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { EmailService, SmsService } from '../../message';
import { Logger } from '@nestjs/common';
import { QueueTasks } from 'shtcut/core';

export class ApiProcessor extends WorkerHost {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
  ) {
    super();
  }

  async process(job) {
    try {
      const { name, data } = job.data;
      const { id, queueName, ...payload } = data;
      Logger.debug(`${id} - ${queueName} - process stated `);
      switch (name) {
        case QueueTasks.SEND_EMAIL:
          await this.sendEmail(payload);
          break;
        case QueueTasks.SEND_SMS:
          // todo send sms payload to queue
          break;
        default:
          return true;
      }
      Logger.debug(`${id} - ${queueName} - process ended `);
    } catch (e) {
      throw e;
    }
  }

  async sendEmail(data) {
    try {
      await this.emailService.sendEmail(data);
    } catch (e) {
      throw e;
    }
  }

  @OnWorkerEvent('failed')
  async onFailed(job) {
    const { id, name } = job;
    Logger.error(`Job - ${id} - ${name} - Failed`);
    try {
      switch (name) {
        case QueueTasks.SEND_EMAIL:
          await this.emailService.sendErrorMessage(job);
          break;
        case QueueTasks.SEND_SMS:
          break;
        default:
          return true;
      }
    } catch (e) {
      throw e;
    }
  }

  @OnWorkerEvent('drained')
  onDrained() {
    Logger.debug(`Queue drained at ${new Date().toISOString()}`);
  }
}
