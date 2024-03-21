import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as _ from 'lodash';
import { parse as HTML, HTMLElement } from 'node-html-parser';
import { firstValueFrom } from 'rxjs';
import { Dict, HtmlMetadata, HtmlMetadataResult, RedisService } from 'shtcut/core';

@Injectable()
export class HtmlMetaService {
  constructor(protected httpService: HttpService) {}

  readMT(el: HTMLElement, name: string) {
    const prop = el.getAttribute('name') || el.getAttribute('property');
    return prop == name ? el.getAttribute('content') : null;
  }

  public async parser(config: AxiosRequestConfig) {
    const { url } = config;
    if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(url)) return {};

    const { data } = await firstValueFrom(
      this.httpService.request({
        ...config,
      }),
    );

    const $ = HTML(data);
    const og: HtmlMetadata = {};
    const meta: HtmlMetadata = {};
    const images = [];

    const title = $.querySelector('title');
    if (title) meta.title = title.text;

    const canonical = $.querySelector('link[rel=canonical]');
    if (canonical) {
      meta.url = canonical.getAttribute('href');
    }

    const metas = $.querySelectorAll('meta');
    for (let i = 0; i < metas.length; i++) {
      const el = metas[i];

      ['title', 'description', 'image'].forEach((s) => {
        const val = this.readMT(el, s);
        if (val) meta[s] = val;
      });

      ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name', 'og:title'].forEach((s) => {
        const val = this.readMT(el, s);
        if (val) og[s.split(':')[1]] = val;
      });
    }

    $.querySelectorAll('img').forEach((el) => {
      let src: string = el.getAttribute('src');
      if (src) {
        src = new URL(src, url).href;
        images.push({ src });
      }
    });
    return { meta, og, images };
  }

  public async getMetadata(url: string, cacheService: RedisService, axiosConfig?: AxiosRequestConfig) {
    try {
      const config: AxiosRequestConfig = {
        url,
        ..._.omit(axiosConfig, ['headers']),
        headers: {
          'Accept-Encoding': 'gzip,deflate,br',
          ...axiosConfig?.headers,
        },
      };
      let value = await cacheService.getAsObj<HtmlMetadataResult | null>(url);
      if (!value) {
        value = (await this.parser(config)) as HtmlMetadataResult;
        await cacheService?.set(url, value, '1m');
      }
      return value;
    } catch (e) {
      Logger.error(`metadata-error:${e}`);
      return null;
    }
  }
}
