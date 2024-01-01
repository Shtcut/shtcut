export interface IEmailName {
  email: string;
  name?: string;
  fromEmail?: string;
}

export interface MailOption {
  emailName: IEmailName;
  fromEmail: IEmailName;
  subject: string;
  template: string;
  content?: any;
}
