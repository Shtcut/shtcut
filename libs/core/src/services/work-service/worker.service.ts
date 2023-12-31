import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BasicJob, EmailJob, MailOption, QueueTasks, Queues } from 'shtcut/core';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class WorkService {
  constructor(
    private readonly config: ConfigService,
    @InjectQueue(Queues.API) private readonly apiQueue: Queue,
    @InjectQueue(Queues.SHTCUT_TASK) private readonly taskQueue: Queue,
  ) {}

  /**
   * The function `queueToSendEmail` creates an email job and adds it to a queue for sending, unless
   * the application environment is set to 'test'.
   * @param {MailOption} option - The `option` parameter is an object that contains the following
   * properties:
   */
  public queueToSendEmail(option: MailOption) {
    const emailJob = new EmailJob()
      .setFrom(option.fromEmail)
      .setTo(option.emailName)
      .setSubject(option.subject)
      .setTemplate(option.template)
      .setContent(option.content);
    if (this.config.get('app.environment') !== 'test') {
      console.log('emailJob:::', emailJob);
      this.addJob(QueueTasks.SEND_EMAIL, emailJob);
    }
  }

  /**
   * The function `handleQueueJob` creates a new job with the given task key and payload, and adds it
   * to the queue if the environment is not set to 'test'.
   * @param {QueueTasks} taskKey - The `taskKey` parameter is a value that represents the type of task
   * to be performed. It is of type `QueueTasks`.
   * @param payload - The `payload` parameter is a record object that can contain any key-value pairs.
   * It is used to pass data or information to the job that will be executed. The specific structure
   * and content of the payload will depend on the requirements of the task being performed.
   */
  handleQueueJob(taskKey: QueueTasks, payload: Record<string, any>) {
    const job = new BasicJob();
    job.setData(payload);
    if (this.config.get('environment') !== 'test') {
      this.addJob(taskKey, job);
    }
  }

  /**
   * The `addJob` function adds a job to a message broker queue, with options for different message
   * broker integrations.
   * @param {QueueTasks} key - The `key` parameter is a string that represents the task or job to be
   * added to the queue. It is used to identify and categorize different types of jobs.
   * @param {any} job - The `job` parameter is an object that represents the task or job that needs to
   * be added to the queue. It can be of any type, as indicated by the `any` type annotation.
   * @param options - The `options` parameter is an optional object that can contain additional
   * configuration options for the job. It is a record type, which means it is an object with string
   * keys and any values.
   */
  addJob(key: QueueTasks, job: any, options: Record<string, any> = {}) {
    const defaultBroker = this.config.get('app.messageBroker');
    Logger.debug(`${defaultBroker} job - ${key} - :: ${JSON.stringify(job)}, - options ${JSON.stringify(options)}`);
    if (defaultBroker === 'redis') {
      const { isTask = false, ...rest } = options;
      console.log('addJob-options::', options);
      const queueOption = {
        ...rest,
        removeComplete: 50,
        removeOnFail: 1000,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      };
      if (!isTask) {
        this.apiQueue.add(key, job, queueOption);
      } else {
        this.apiQueue.add(key, job, queueOption);
      }
    } else {
      // todo any other message broker integration come here
    }
  }
}
