import { WorkerQueue } from '../enum';
import { Job } from './job';

export class BasicJob extends Job {
  public data: any;

  constructor() {
    super(WorkerQueue.PROCESS_WORK);
  }

  public setData(data: any) {
    this.data = data;
    return this;
  }
}
