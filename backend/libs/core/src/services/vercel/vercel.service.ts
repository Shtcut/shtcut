import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AppException, Dict } from 'shtcut/core';
import lang from 'shtcut/core/lang';
import { BaseVercelAbstract } from './base-vercel.abstract';

@Injectable()
export class VercelService extends BaseVercelAbstract {
  constructor(
    protected httpService: HttpService,
    protected config: ConfigService,
  ) {
    super(config);
  }

  /**
   * The function `verifyDomain` is an asynchronous function that sends a POST request to verify a
   * domain and returns the status and data of the response.
   * @param {string} name - The `name` parameter is a string that represents the domain name that you
   * want to verify.
   * @param {Dict} [options] - The `options` parameter is an optional dictionary that can contain
   * additional parameters for the HTTP request. These parameters will be included as query parameters
   * in the request URL.
   * @returns an object with two properties: "status" and "data".
   */
  public async verifyDomain(name: string, options?: Dict) {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService.post(
          `${this.baseURL}/projects/${this.projectId}/domains/${name}/verify`,
          {},
          {
            params: {
              teamId: this.teamId,
              ...options,
            },
            headers: {
              Authorization: this.authToken,
            },
          },
        ),
      );
      return { status, data };
    } catch (e) {
      return AppException.INTERNAL_SERVER(lang.get('vercel').cannotVerifyDomain);
    }
  }

  /**
   * The function `addDomain` is an asynchronous function that adds a domain to a project using the
   * Vercel API.
   * @param {string} name - The `name` parameter is a string that represents the name of the domain to
   * be added. It is a required parameter.
   * @param {Dict} [options] - The `options` parameter is an optional object that can contain
   * additional parameters for the HTTP request. These parameters will be included in the query string
   * of the request URL.
   * @returns an object with two properties: "status" and "data".
   */
  public async addDomain(name: string, options?: Dict) {
    try {
      const payload = { name };
      const { status, data } = await firstValueFrom(
        this.httpService.post(`${this.baseURL}/projects/${this.projectId}/domains`, payload, {
          params: {
            teamId: this.teamId,
            ...options,
          },
          headers: {
            Authorization: this.authToken,
          },
        }),
      );
      return { status, data };
    } catch (e) {
      return AppException.INTERNAL_SERVER(lang.get('vercel').unableToAddDomain);
    }
  }

  /**
   * The function `getProjectDomainByName` retrieves a project domain by name using an HTTP GET
   * request.
   * @param {Dict} [params] - The `params` parameter is an optional dictionary object that can contain
   * additional query parameters to be included in the HTTP request. These parameters will be appended
   * to the URL as query parameters.
   * @returns an object with two properties: "status" and "data".
   */
  public async getProjectDomainByName(params?: Dict) {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService.get(`${this.baseURL}/projects/${this.projectId}/domains`, {
          params: {
            verified: true,
            teamId: this.teamId,
            ...params,
          },
          headers: {
            Authorization: this.authToken,
          },
        }),
      );
      return { status, data };
    } catch (e) {
      return AppException.INTERNAL_SERVER(lang.get('vercel').unableToFetchProjectDomain);
    }
  }

  /**
   * The `removeDomain` function is used to delete a domain from a project.
   * @param {string} domain - The `domain` parameter is a string that represents the domain name that
   * you want to remove from a project.
   * @param {Dict} [options] - The `options` parameter is an optional object that can contain
   * additional parameters for the HTTP request. These parameters will be included as query parameters
   * in the request URL.
   * @returns an object with two properties: "status" and "data".
   */
  public async removeDomain(domain: string, options?: Dict) {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService.delete(`${this.baseURL}/projects/${this.projectId}/domains/${domain}`, {
          params: {
            teamId: this.teamId,
            ...options,
          },
          headers: {
            Authorization: this.authToken,
          },
        }),
      );
      return { status, data };
    } catch (e) {
      return AppException.INTERNAL_SERVER(lang.get('vercel').unableToFetchProjectDomain);
    }
  }

  /**
   * The function `getDomainConfig` retrieves the configuration of a domain by making an HTTP GET
   * request to a specific endpoint.
   * @param {string} name - The `name` parameter is a string that represents the name of the domain for
   * which you want to retrieve the configuration.
   * @param {Dict} [options] - The `options` parameter is an optional dictionary object that can
   * contain additional parameters for the HTTP request. These parameters will be included as query
   * parameters in the request URL.
   * @returns an object with two properties: "status" and "data".
   */
  public async getDomainConfig(name: string, options?: Dict) {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService.get(`${this.baseURL}/domains/${name}/config`, {
          params: {
            teamId: this.teamId,
            ...options,
          },
          headers: {
            Authorization: this.authToken,
          },
        }),
      );
      return { status, data };
    } catch (e) {
      return AppException.INTERNAL_SERVER(lang.get('vercel').cannotGetDomainConfig);
    }
  }

  /**
   * The function `getDomain` is an asynchronous function that retrieves domain information based on a
   * given name and optional options, and returns the status and data of the retrieved domain.
   * @param {string} name - The `name` parameter is a string that represents the name of the domain you
   * want to retrieve information for.
   * @param {Dict} [options] - The `options` parameter is an optional object that can contain
   * additional parameters for the HTTP request. These parameters will be included as query parameters
   * in the request URL.
   * @returns an object with two properties: "status" and "data".
   */
  public async getDomain(name: string, options?: Dict) {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService.get(`${this.baseURL}/domains/${name}`, {
          params: {
            teamId: this.teamId,
            ...options,
          },
          headers: {
            Authorization: this.authToken,
          },
        }),
      );
      return { status, data };
    } catch (e) {
      return AppException.INTERNAL_SERVER(lang.get('vercel').cannotGetDomain);
    }
  }

  public createProject(name: string, options?: Dict) {
    throw new Error('Method not implemented.');
  }
  public getProject(name: string, options?: Dict) {
    throw new Error('Method not implemented.');
  }
  public findProject(name: string, options?: Dict) {
    throw new Error('Method not implemented.');
  }
  public updateProject(name: string, options?: Dict) {
    throw new Error('Method not implemented.');
  }
}
