import { HttpStatus } from '@nestjs/common';

export class AppException {
  constructor(
    readonly code: number,
    readonly message: any,
    readonly messages?: string[],
  ) {}

  static NOT_FOUND = (message) => {
    return new AppException(HttpStatus.NOT_FOUND, message);
  };

  static FORBIDDEN = (message) => {
    return new AppException(HttpStatus.FORBIDDEN, message);
  };

  static PRECONDITION_FAILED = (message) => {
    return new AppException(HttpStatus.PRECONDITION_FAILED, message);
  };

  static UNAUTHORIZED = (message) => {
    return new AppException(HttpStatus.UNAUTHORIZED, message);
  };

  static INVALID_TOKEN = (message = 'Invalid authentication token') => {
    return new AppException(HttpStatus.UNAUTHORIZED, message);
  };

  static INTERNAL_SERVER = (message, messages?) => {
    return new AppException(HttpStatus.INTERNAL_SERVER_ERROR, message, messages);
  };

  static CONFLICT = (message) => {
    return new AppException(HttpStatus.CONFLICT, message);
  };

  static BAD_REQUEST = (message, messages?) => {
    return new AppException(HttpStatus.BAD_REQUEST, message, messages);
  };

  static INVALID_INPUT = (message) => {
    return new AppException(HttpStatus.BAD_REQUEST, message);
  };

  getStatus() {
    return this.code;
  }

  getResponse() {
    const response: any = {
      code: this.code || HttpStatus.INTERNAL_SERVER_ERROR,
      message: this.message,
    };
    if (this.messages) {
      response.messages = this.messages;
    }
    return response;
  }
}
