import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import lang from 'apps/sht-worker/lang';
import { AppException } from 'shtcut/core';
import * as sgMail from '@sendgrid/mail';
import { lastValueFrom } from 'rxjs';

export class EmailService {
  constructor(
    protected config: ConfigService,
    readonly httpService: HttpService,
  ) {}

  /**
   * The function sends an email using either SendGrid or PostMark based on the configuration.
   * @param options - The `options` parameter is a record (object) that contains various properties for
   * configuring the email. The specific properties and their values depend on the implementation of
   * the `useSendGrid` and `usePostMark` methods.
   * @returns The function `sendEmail` returns the `mailProvider` variable.
   */
  async sendEmail(options: Record<string, any>) {
    if (this.config.get('app.environment') === 'test') {
      return;
    }
    const mailOption = this.config.get('worker.email.mailOption');
    let mailProvider = this.useSendGrid(options);
    if (mailOption === 'postmark') {
      mailProvider = await this.usePostMark(options);
    }
    return mailProvider;
  }

  /**
   * The function `sendErrorMessage` sends an error report email with information about a Redis queue
   * event.
   * @param job - The `job` parameter is an object that contains information about a specific job in a
   * Redis queue. It has the following properties:
   * @returns the result of calling the `sendEmail` function with the `payload` object as an argument.
   */
  async sendErrorMessage(job) {
    const { id, name, data } = job;
    const payload = {
      from: { email: 'no-reply@shtcut.link' },
      to: { email: this.config.get('app.errorReportEmail') },
      subject: `Error report: Redis queue event - ${name}`,
      template: this.config.get('app.errorEmailTemplate') || 'redis',
      content: {
        jobId: id,
        data: {
          from: data.from.email,
          to: data.to.email,
          subject: data.subject,
          template: data.template,
        },
      },
    };
    return this.sendEmail(payload);
  }

  async useSendGrid(options) {
    try {
      if (!options.recipients && !options.templateId && !options.template) {
        throw AppException.INTERNAL_SERVER(lang.get('err').emailError);
      }

      sgMail.setApiKey(`${this.config.get('worker.email.sengrid.apiKey')}`);
      sgMail.setSubstitutionWrappers('{{', '}}');
      const message: any = {
        to: options.recipients || options.to,
        from: options.from || this.config.get('worker.email.sendgrid.fromEmail'),
        subject: options.subject || this.config.get('app.appName'),
      };

      if (options.template) {
        message['html'] = await this.getHtmlFromTemplate(options.content, options.template);
      } else {
        message['templateId'] = options.templateId;
      }
      if (options.attachments && options.attachments.length) {
        message['attachments'] = options.attachments;
      }
      if (options.substitutions) {
        message.dynamic_template_data = Object.assign({}, options.substitutions, {
          appName: this.config.get('app.appName'),
        });
      }
      return sgMail.send(message);
    } catch (e) {
      Logger.error(`sendgrid-err::${e}`);
      throw e;
    }
  }

  async usePostMark(options) {
    try {
      if (!options.recipients && !options.templateId && !options.template) {
        throw AppException.INTERNAL_SERVER(lang.get('err').emailError);
      }

      const message: any = {
        To: options.recipients || options.to,
        From: options.from || this.config.get('worker.email.postmark.fromEmail'),
        Subject: options.subject || this.config.get('app.appName'),
      };

      if (options.template) {
        message['HtmlBody'] = await this.getHtmlFromTemplate(options.content, options.template);
      } else {
        message['TemplateId'] = options.templateId;
        message['TemplateModel'] = { user_name: `${this.config.get('worker.email.postmark.username')}` };
      }
      if (options.attachments && options.attachments.length) {
        message['Attachments'] = options.attachments;
      }
      if (options.substitutions) {
        message.dynamic_template_data = Object.assign({}, options.substitutions, {
          appName: this.config.get('app.appName'),
        });
      }
      message['MessageStream'] = 'outbound';
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': this.config.get('worker.email.postmark.apiKey'),
        },
      };
      const res = await lastValueFrom(
        this.httpService.post(this.config.get('worker.email.postmark.url'), message, config),
      );
      return res.data;
    } catch (e) {
      Logger.error(`postmark-err::${e}`);
      throw e;
    }
  }

  async getHtmlFromTemplate(content, templateValue) {}
}
