import { Pagination, QueryParser } from '../common';
import { MailOption } from './mail-option';
import { SmsOption } from './sms-option';

export interface ResponseOption {
  value?: any;
  code: number;
  model?: any;
  queryParser?: QueryParser;
  pagination?: Pagination;
  hiddenFields?: string[];
  message?: string;
  count?: number;
  token?: string;
  filterQuery?: Record<string, any>;
  email?: MailOption;
  sms?: SmsOption;
}
