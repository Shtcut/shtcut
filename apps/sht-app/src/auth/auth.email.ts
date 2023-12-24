import { MailOption } from 'shtcut/core';

export class AuthEmail {
  static async verifyEmail(
    config: { from: string; template: string; code: string; type?: string; subject?: string },
    auth,
  ): Promise<MailOption> {
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
      subject: config.subject || 'Shtcut - Email Verification',
      template: config.template,
      content: {
        type: config.type || 'email',
        code: config.code,
        email: auth.email,
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
