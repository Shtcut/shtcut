import { configuration } from '@config';
import { AppResponse, ResponseOption, Utils } from 'shtcut/core';
import * as _ from 'lodash';

export abstract class BaseAbstract {
  public routes = {
    create: true,
    findOne: true,
    find: true,
    update: true,
    patch: true,
    remove: true,
  };
  public itemsPerPage = 10;
  public modelName: string;
  public baseUrl = configuration().app.baseUrl || 'localhost:7000';
  public entity: any = {};
  protected model;
  protected defaultConfig = {
    idToken: 'key',
    slugify: '',
    softDelete: false,
    unique: [],
    returnDuplicate: false,
    fillables: [],
    updatedFillables: [],
    dateFilters: [],
    hiddenFields: ['deleted'],
  };

  /**
   * The function "validateCreate" is a TypeScript function that returns a promise that resolves to
   * null.
   * @param obj - The "obj" parameter is an object that is being passed to the "validateCreate"
   * function.
   * @returns null.
   */
  public async validateCreate(obj) {
    return null;
  }

  /**
   * The function "validateDelete" is an asynchronous function that returns null.
   * @param current - The "current" parameter is the object or data that you want to validate before
   * deleting it.
   * @returns null.
   */
  public async validateDelete(current) {
    return null;
  }

  /**
   * The function "validateUpdate" is a TypeScript function that takes in two parameters, "current" and
   * "obj", and returns a promise that resolves to null.
   * @param current - The "current" parameter is the current object that you want to validate and
   * update.
   * @param obj - The `obj` parameter is an object that contains the updated values that need to be
   * validated.
   * @returns null.
   */
  public async validateUpdate(current, obj) {
    return null;
  }

  /**
   * The function "validatePatch" is a TypeScript function that takes an object as a parameter and
   * returns a promise that resolves to null.
   * @param obj - The `obj` parameter is an object that needs to be validated.
   * @returns null.
   */
  public async validatePatch(obj) {
    return null;
  }

  /**
   * The postCreate function is an asynchronous function that takes a ResponseOption parameter and
   * returns the same parameter.
   * @param {ResponseOption} response - The parameter "response" is of type "ResponseOption".
   * @returns The `response` object is being returned.
   */
  public async postCreate(response: ResponseOption) {
    return response;
  }

  /**
   * The function "postUpdate" is an asynchronous function that takes a parameter "response" of type
   * "ResponseOption" and returns the same response.
   * @param {ResponseOption} response - The parameter "response" is of type "ResponseOption".
   * @returns The `postUpdate` function is returning the `response` parameter.
   */
  public async postUpdate(response: ResponseOption) {
    return response;
  }

  /**
   * The function "postPatch" is an asynchronous function that takes a "ResponseOption" parameter and
   * returns the same parameter.
   * @param {ResponseOption} response - The `response` parameter is of type `ResponseOption`.
   * @returns The `response` object is being returned.
   */
  public async postPatch(response: ResponseOption) {
    return response;
  }

  /**
   * The function "postFind" is an asynchronous function that takes a "ResponseOption" parameter and
   * returns the same parameter.
   * @param {ResponseOption} response - The parameter "response" is of type "ResponseOption".
   * @returns The `response` object is being returned.
   */
  public async postFind(response: ResponseOption) {
    return response;
  }

  /**
   * The function "postFindOne" returns a response object asynchronously.
   * @param {ResponseOption} response - The parameter "response" is of type "ResponseOption".
   * @returns The response object is being returned.
   */
  public async postFindOne(response: ResponseOption) {
    return response;
  }

  public async getResponse(option: ResponseOption) {
    const { token, message, count, code: statusCode, queryParser, hiddenFields = [], pagination } = option;
    try {
      this.model = option.model ?? this.model;
      const meta: Record<string, any> = AppResponse.geSuccessMeta();
      if (token) {
        meta.token = option.token;
      }
      _.assign(meta, { statusCode });
      if (option.message) {
        meta.message = message;
      }
      if (option.value && queryParser && option.queryParser.population && this.model && this.model.populate) {
        option.value = await this.model.populate(option.value, queryParser.population);
      }
      if (option.pagination && !option.queryParser.getAll) {
        option.pagination.totalCount = count;
        if (pagination.morePages(count)) {
          pagination.next = pagination.current + 1;
        }
        meta.pagination = option.pagination.done();
      }
      let exclude: string[] = [];
      if (queryParser && queryParser.exclude && _.isString(queryParser.exclude)) {
        exclude = JSON.parse(queryParser.exclude);
      }
      const modelHiddenFields = this.entity.config.hiddenFields;
      if (modelHiddenFields && modelHiddenFields.length) {
        const excludedFields = [...modelHiddenFields, ...hiddenFields, ...exclude];
        if (_.isArray(option.value)) {
          option.value = option.value.map((v) => ({
            ..._.omit(v.toJsSON ? v.toJSON() : v, excludedFields),
          }));
        } else {
          option.value = {
            ..._.omit(option.value && option.value.toJSON ? option.value.toJSON() : option.value, excludedFields),
          };
        }
      }
      return AppResponse.format(meta, option.value);
    } catch (e) {
      throw e;
    }
  }

  /**
   * @param {Object} req The request object
   * @return {Promise<Object>}
   */
  public async prepareBodyObject(req) {
    let obj = Object.assign({}, req.body);
    const slugName = this.entity.config.slugify;
    if (req.user) {
      obj = Object.assign(obj, {
        user: req.user,
        userId: req.user._id,
      });
      if (slugName && (!_.isEmpty(slugName) || !_.isNull(slugName) || !_.isUndefined(slugName))) {
        obj = Object.assign(obj, { slug: Utils.slugifyText(req.body[slugName].toLowerCase()) });
      }
    }
    return obj;
  }

  /**
   * @param {Object} pagination The pagination object
   * @param {Object} query The query
   * @param {Object} queryParser The query parser
   * @return {Object}
   */
  public async buildModelAggregateQueryObject(pagination, query, queryParser = null) {
    return null;
  }

  /**
   * @param {Object} obj The request object
   * @return {Promise<Object>}
   */
  public async retrieveExistingResource(obj) {
    return null;
  }
}
