import { ValidationError, validate } from '@nestjs/class-validator';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AppException } from '../../exceptions';
import { BAD_REQUEST } from '../../constants';
import lang from 'shtcut/core/lang';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<Record<string, any>> {
  /**
   * The function "formatErrors" takes an array of validation errors and returns a formatted object
   * with nested errors.
   * @param {ValidationError[]} errors - An array of ValidationError objects. Each ValidationError
   * object represents an error in the validation process and contains information about the error,
   * such as the property that failed validation and any constraints associated with the error.
   * @returns an object that contains the formatted errors.
   */
  static formatErrors(errors: ValidationError[]) {
    const formatted = {};

    const getNestedErrors = (error) => {
      if (!error.children || error.children.length === 0) {
        return error.constraints;
      } else {
        return this.formatErrors(error.children);
      }
    };

    errors.forEach((err) => {
      formatted[err.property] = getNestedErrors(err);
    });

    return formatted;
  }

  /**
   * The function returns an AppException with a BAD_REQUEST status code, a corresponding error
   * message, and any validation errors provided.
   * @param errors - The "errors" parameter is an object that contains information about the validation
   * errors that occurred. It could be a collection of error messages, error codes, or any other
   * relevant information related to the validation errors.
   * @returns A new instance of the AppException class with the status code BAD_REQUEST, the error
   * message "error.badRequest" from the lang object, and the errors parameter.
   */
  public static VALIDATION_ERROR(errors) {
    return new AppException(BAD_REQUEST, lang.get('error').badRequest, errors);
  }

  /**
   * The function checks if a given metatype is not one of the predefined types.
   * @param metatype - The `metatype` parameter is the data type that you want to validate. It can be
   * any data type such as String, Boolean, Number, Array, or Object. The `toValidate` function checks
   * if the `metatype` is not one of these predefined types and returns a boolean value
   * @returns a boolean value.
   */
  private static toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  /**
   * The function transforms a value based on a given metatype and validates it using a ValidationPipe.
   * @param value - The `value` parameter is a record (object) containing key-value pairs. It
   * represents the data that needs to be transformed or validated.
   * @param {ArgumentMetadata}  - - `value`: The value to be transformed.
   * @returns the `value` parameter if the `metatype` is falsy or if it does not need to be validated.
   * Otherwise, it converts the `value` into an instance of the `metatype` using the `plainToInstance`
   * function, validates the object using the `validate` function, and throws a validation error if
   * there are any errors. If there are no errors
   */
  async transform(value: Record<string, any>, { metatype }: ArgumentMetadata) {
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formatted = ValidationPipe.formatErrors(errors);
      throw ValidationPipe.VALIDATION_ERROR(formatted);
    }

    return value;
  }
}
