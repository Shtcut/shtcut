import { HttpStatus } from '@nestjs/common';
import { ResponseOption } from 'shtcut/core';

export class AppResponse {
  /**
   * @param {Object} success the meta object
   * @return {Object} The success response object
   */
  static geSuccessMeta(success = true) {
    return { statusCode: HttpStatus.OK, success };
  }

  /**
   * @param {Object} meta the meta object
   * @param {Object} data success response object
   * @return {Object} The success response object
   */
  static format(meta: any, data = null) {
    const response: Record<string, any> = {};
    response.meta = meta;
    if (data) response.data = data;
    return response;
  }

  /**
   * @param {ResponseOption} options required for response
   * @return {Object} The formatted response
   */
  static async getResponse(option: ResponseOption) {
    try {
      const meta: Record<string, any> = AppResponse.geSuccessMeta();
      if (option.token) {
        meta.token = option.token;
      }
      Object.assign(meta, { statusCode: option.code });
      if (option.message) {
        meta.message = option.message;
      }
      return AppResponse.format(meta, option.value);
    } catch (e) {
      throw e;
    }
  }
}
