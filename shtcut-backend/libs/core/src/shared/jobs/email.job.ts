import { WorkerQueue } from '../enum';
import { IEmailName } from '../interfaces';
import { Job } from './job';

export class EmailJob extends Job {
  public to: IEmailName | IEmailName[];
  public subject: string;
  public template: string;
  public content: any;
  private from: IEmailName;

  constructor() {
    super(WorkerQueue.PROCESS_WORK);
  }

  public setFrom(value: IEmailName) {
    this.from = value;
    return this;
  }

  public setTo(value: IEmailName | IEmailName[]) {
    this.to = value;
    return this;
  }

  public setSubject(value: string) {
    this.subject = value;
    return this;
  }

  public setTemplate(value: string) {
    this.template = value;
    return this;
  }

  public setContent(value: any) {
    this.content = value;
    return this;
  }
}
