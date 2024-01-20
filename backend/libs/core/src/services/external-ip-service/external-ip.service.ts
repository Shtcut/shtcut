import { HttpService } from '../http-service/http.service';

export class ExternalIpService {
  private static url = 'https://api.ipify.org?format=json';

  public static async getRemoteIp() {
    const remoteIP = await HttpService.get<{ ip: string }>(this.url);
    return remoteIP.ip;
  }
}
