import { MailOption } from 'shtcut/core';

type EmailType = {
  to: string;
  from: string;
  template: string;
  code?: string;
  type?: string;
  subject?: string;
};
export class AuthEmail {
  static async sendEmail(config: EmailType): Promise<MailOption> {
    return {
      emailName: {
        email: config.to,
      },
      fromEmail: {
        email: config.from,
      },
      subject: config.subject || 'Shtcut - Email Verification',
      template: config.template,
      content: {
        type: config.type || 'email',
        code: config.code,
        email: config.to,
      },
    };
  }

  static async sendWelcomeEmail(config, auth): Promise<MailOption> {
    if (!auth.email) {
      return null;
    }
    return {
      emailName: {
        email: auth.email,
      },
      fromEmail: {
        email: config.from,
      },
      subject: config.subject || 'Welcome to Shtcut',
      template: config.template,
      content: {
        type: config.type || 'email',
        email: auth.email,
      },
    };
  }
}
