import { HttpErrorHandle } from 'shtcut/core';
import axios from 'axios';

export class HttpService {
  public static async get<T>(url: string, errHandler?: HttpErrorHandle<T>) {
    return axios
      .get(url)
      .then((res) => res.data)
      .catch(errHandler);
  }
}
