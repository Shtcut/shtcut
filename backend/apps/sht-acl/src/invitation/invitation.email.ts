import { MailOption } from 'shtcut/core';

type EmailType = {
  to: string;
  from: string;
  template: string;
  workspace: string;
  link: string;
  subject?: string;
};

export class InvitationEmail {
  static sendEmail(config: EmailType): MailOption {
    return {
      emailName: {
        email: config.to,
      },
      fromEmail: {
        email: config.from,
      },
      subject: config.subject || `Invitation from ${config.workspace} to Shtcut`,
      template: config.template,
      content: {
        workspace: config.workspace,
        link: config.link,
        email: config.to,
      },
    };
  }
}
