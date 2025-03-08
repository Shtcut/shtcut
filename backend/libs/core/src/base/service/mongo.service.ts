import { Logger } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'lodash';
import mongoose, { ClientSession } from 'mongoose';
import { AppException, BaseAbstract, Dict, Pagination, QueryParser, RedisService, Utils } from 'shtcut/core';

export class MongoBaseService extends BaseAbstract {
  /**
   * The constructor initializes the model, cacheService, modelName, and entity properties, and sets
   * the entity's config property based on certain conditions.
   * @param model - The `model` parameter is the model object that represents a collection in a
   * database. It is used to interact with the database and perform CRUD operations on the collection.
   * @param {RedisService} [cacheService] - The `cacheService` parameter is an optional parameter of
   * type `RedisService`. It is used to provide caching functionality to the constructor. If a
   * `RedisService` instance is provided, it will be assigned to the `cacheService` property of the
   * class. If no `RedisService` instance is
   */
  constructor(
    protected model,
    protected cacheService?: RedisService,
  ) {
    super();
    this.modelName = model.collection.collectionName;
    this.entity = model;
    this.configureEntity();
  }

  /**
   * The function checks if the entity has a config property, and if not, assigns a default config;
   * otherwise, it processes the entity's config.
   */
  private configureEntity() {
    if (!this.entity?.config) {
      this.entity.config = { ...this.defaultConfig };
    } else {
      this.processEntityConfig();
    }
  }

  /**
   * The function `processEntityConfig` assigns default configuration values to an entity's config
   * property, either by calling a function or by directly assigning an object.
   */
  private processEntityConfig() {
    if (this.entity.config instanceof Function) {
      this.entity.config = Object.assign(this.defaultConfig, this.entity.config());
    } else {
      this.entity.routes = Object.assign(this.routes, this.entity.routes);
      this.entity.config = Object.assign(this.defaultConfig, this.entity.config);
    }
  }

  /**
   * The function `fillObjectProperties` returns a new object with only the properties specified in the
   * `fillables` array, or the original object if `fillables` is empty or undefined.
   * @param {Dict} obj - The `obj` parameter is a dictionary object that contains properties to be
   * filled.
   * @returns a new object that contains only the properties specified in the `toFill` array. If the
   * `toFill` array is empty or undefined, the function returns a shallow copy of the original object.
   */
  private fillObjectProperties(obj: Dict): Dict {
    const toFill = this.entity.config.fillables;
    return toFill && toFill.length > 0 ? _.pick(obj, ...toFill) : { ...obj };
  }

  /**
   * The function creates a new object, fills its properties, generates a unique ID, and saves it to
   * the database.
   * @param {Dict} obj - The `obj` parameter is a dictionary object that contains the properties of the
   * new object that you want to create.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a session for the database transaction. If a session is
   * provided, the function will use that session to save the data to the database. If no session is
   * provided, the function will create a new session
   * @returns the result of calling the `saveDataToDatabase` function with the `data` object and the
   * optional `session` parameter.
   */
  public async createNewObject(obj: Dict, session?: ClientSession) {
    const payload = this.fillObjectProperties(obj);
    const data = new this.model({
      ...payload,
      publicId: Utils.generateUniqueId(this.defaultConfig.idToken),
    });

    return this.saveDataToDatabase(data, session);
  }

  /**
   * The function saves data to a database, optionally using a session.
   * @param data - The `data` parameter is the object or document that you want to save to the
   * database. It could be an instance of a model or a document object that represents a record in the
   * database.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It represents a MongoDB session that can be used to perform multiple operations
   * within a transaction. If a session is provided, the `data` object will be saved within that
   * session. If no session is provided, the `data`
   * @returns a promise.
   */
  private async saveDataToDatabase(data, session?: ClientSession) {
    return session ? await data.save({ session }) : await data.save();
  }

  /**
   * The function updates an object in a database collection, using either the object's ID or public ID
   * as the identifier, and returns the updated object.
   * @param {string} id - The `id` parameter is a string that represents the identifier of the object
   * to be updated. It can be either the `_id` field or the `publicId` field of the object.
   * @param obj - The `obj` parameter is an object that contains the data to be updated in the
   * database. It can have any number of key-value pairs, where the key represents the field name in
   * the database and the value represents the new value for that field.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a MongoDB session to use for the update operation. If a
   * session is provided, the update operation will be performed within the context of that session,
   * allowing for transactional behavior. If no session is provided
   * @returns the result of the `findOneAndUpdate` method.
   */
  public async updateObject(id: string, obj: Dict, session?: ClientSession) {
    const toFill: string[] = this.entity.config.updateFillables;
    obj = toFill && toFill.length > 0 ? _.pick(obj, ...toFill) : { ...obj };
    const condition = Utils.isObjectId(id) ? { _id: id } : { publicId: id };

    return await this.model.findOneAndUpdate(
      { ...condition },
      {
        $setOnInsert: {
          publicId: Utils.generateUniqueId(this.defaultConfig.idToken),
        },
        ...obj,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        session: session ? session : null,
      },
    );
  }

  /**
   * The function updates an object by merging the properties of another object into it and then saves
   * the updated object to a database.
   * @param {any} current - The `current` parameter is the current object that you want to update. It
   * represents the existing data that you want to modify.
   * @param obj - The `obj` parameter is an object that contains the updated values for the `current`
   * object. It is used to update the properties of the `current` object.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It represents a MongoDB client session that can be used to group multiple
   * operations into a single transaction. If a session is provided, the function will use it to save
   * the data to the database. If no session is provided, the
   * @returns the result of calling the `saveDataToDatabase` function with the `session` parameter.
   */
  public async patchUpdate(current: any, obj: Record<string, any>, session?: ClientSession) {
    const toFill: string[] = this.entity.config.updateFillables;
    obj = toFill && toFill.length > 0 ? _.pick(obj, ...toFill) : { ...obj };
    _.merge(current, obj);

    return this.saveDataToDatabase(session);
  }

  /**
   * The function finds an object by its ID, either from cache or from the database, and returns it.
   * @param {unknown} id - The `id` parameter is the identifier of the object you want to find. It can
   * be of any type, as it is typed as `unknown`.
   * @param {QueryParser | Record<string, any>} [query] - The `query` parameter is an optional
   * parameter that can be of type `QueryParser` or `Record<string, any>`. It is used to specify
   * additional conditions or options for fetching the object from the database. If provided, it will
   * be passed to the `fetchObjectFromDB` function.
   * @returns an object of type `Dict`.
   */
  public async findObject(id: unknown, query?: QueryParser | Record<string, any>) {
    const condition = this.buildFindObjectCondition(id);
    const cacheKey = this.getCacheKey(id);
    let object = await this.getCacheObject(cacheKey);

    if (_.isUndefined(object)) {
      object = await this.model.findOne(condition).populate(query?.population ?? []);
      await this.cacheObjectIfFound(object, cacheKey);
    }

    this.ensureObjectExists(object);
    return object as Dict;
  }

  /**
   * The function builds a condition object to find an item based on its ID.
   * @param id - The `id` parameter is the identifier used to find an object. It can be either an
   * ObjectId or a publicId.
   * @returns a dictionary that combines the condition `{ deleted: false }` with the `id` parameter.
   * The `id` parameter is checked to see if it is a valid ObjectId using the `Utils.isObjectId()`
   * function. If it is a valid ObjectId, the condition is set to `{ _id: id }`, otherwise it is set to
   * `{ publicId: id }`. The returned
   */
  private buildFindObjectCondition(id): Dict {
    id = Utils.isObjectId(id) ? { _id: id } : { publicId: id };
    return { ...Utils.conditionWithDelete(id) };
  }

  /**
   * The function `getCacheObject` retrieves a cached object from the cache service, either as a single
   * object or as an array of objects.
   * @param {string} cacheKey - The `cacheKey` parameter is a string that represents the key used to
   * retrieve the cached object from the cache service.
   * @param [isArray=false] - The `isArray` parameter is a boolean flag that indicates whether the
   * cached object is an array or not. If `isArray` is `true`, it means that the cached object is an
   * array of `Dict` objects. If `isArray` is `false` or not provided, it means that the
   * @returns a Promise that resolves to either a `Dict` object or a boolean value, depending on the
   * value of the `isArray` parameter.
   */
  private async getCacheObject(cacheKey: string, isArray = false): Promise<Dict | boolean> {
    return isArray
      ? await this.cacheService?.getAsObj<Dict[]>(cacheKey)
      : await this.cacheService?.getAsObj<Dict>(cacheKey);
  }

  private async removeObjectFromCache(cacheKey: string) {
    return await this.cacheService?.remove(cacheKey);
  }

  /**
   * The function caches an object if it exists.
   * @param object - The `object` parameter is the object that you want to cache. It can be any valid
   * JavaScript object or data structure that you want to store in the cache.
   * @param {string} cacheKey - The `cacheKey` parameter is a string that represents the key under
   * which the `object` will be stored in the cache. It is used to uniquely identify the object in the
   * cache so that it can be retrieved later when needed.
   * @param [ttl=1m] - The `ttl` parameter stands for "time to live" and represents the duration for
   * which the cached object will be considered valid. It is optional and has a default value of
   * `'1m'`, which means 1 minute. You can specify the `ttl` in different units such as mins, hours, days (`
   */
  private async cacheObjectIfFound(object, cacheKey: string, ttl = '1m') {
    if (object) {
      await this.cacheService?.set(cacheKey, object, ttl);
    }
  }

  /**
   * The function ensures that an object exists and throws an exception if it does not.
   * @param object - The `object` parameter is the object that needs to be checked for existence.
   */
  private ensureObjectExists(object) {
    if (!object) {
      throw AppException.NOT_FOUND(`${this.modelName} does not exist`);
    }
  }

  /**
   * The function deletes an object from a database, either by setting a "deleted" flag or by removing
   * it completely, and returns the deleted object.
   * @param object - The "object" parameter is a record or object that represents the data to be
   * deleted. It can be of any type and contains key-value pairs of properties and their corresponding
   * values.
   * @returns the deleted object.
   */
  public async deleteObject(id) {
    const condition = { _id: id };
    const object = await this.model.findOne(condition);
    const cacheKey = this.getCacheKey(object);

    if (this.entity.config.softDelete) {
      _.extend(object, { deleted: true });
      await this.saveDataToDatabase(object);
    } else {
      await object.deleteOne(condition);
    }

    this.removeObjectFromCache(cacheKey);
    this.ensureObjectExists(object);

    return await object;
  }

  /**
   * The function builds a query object for model data based on pagination and query parameters.
   * @param {Pagination} pagination - Pagination is an object that contains information about
   * pagination, such as the number of items to skip and the number of items per page.
   * @param {QueryParser} queryParser - The `queryParser` parameter is an object that contains various
   * properties used for parsing and filtering the query. It may have the following properties:
   * @returns The function `buildModelQueryObject` returns an object with two properties: `value` and
   * `count`. The `value` property contains the result of the query execution, while the `count`
   * property contains the count of documents that match the query.
   */
  public async buildModelQueryObject(pagination: Pagination, queryParser: QueryParser, req?: Request) {
    this.applyDateFilters(queryParser);
    this.applyConditionalFilters(queryParser);
    this.convertObjectIds(queryParser);

    let query = this.model.find(queryParser.query);

    if (queryParser.search && this.entity?.searchQuery(queryParser.search).length > 0) {
      const searchQuery = this.applySearchQuery(queryParser);
      query = this.model.find({ ...searchQuery });
    }

    if (!queryParser.getAll) {
      query = this.applyPagination(query, pagination);
    }

    const sortQuery = this.applySortQuery(queryParser);
    query = query.sort(sortQuery);

    const cacheKey = this.getCacheKey(req?.originalUrl ?? '');
    let value = await this.getCacheObject(cacheKey, true);

    if (_.isUndefined(value)) {
      value = await this.executeQueryAndCacheResult(query, queryParser, cacheKey);
    }

    return {
      value,
      count: await this.getCountDocuments(queryParser),
    };
  }

  private async executeQueryAndCacheResult(query, queryParser: QueryParser, cacheKey: string) {
    const object = await query.select(queryParser.selection).exec();
    this.cacheObjectIfFound(object, cacheKey);

    return object;
  }

  private getCacheKey(object) {
    return `${this.modelName}:${_.isString(object) ? object : object?._id}`;
  }

  private convertObjectIds(queryParser: QueryParser) {
    if (this?.entity?.config?.objectIds?.length) {
      const objectIds: string[] = this?.entity?.config?.objectIds;
      for (const key of Object.keys(queryParser.query)) {
        if (
          queryParser.query[key] &&
          objectIds.includes(key) &&
          _.isString(queryParser.query[key]) &&
          Utils.isObjectId(queryParser.query[key])
        ) {
          queryParser.query[key] = Utils.toObjectId(queryParser.query[key]);
        }
      }
    }
  }

  private applyConditionalFilters(queryParser: QueryParser) {
    const conditions: string[] = ['gt', 'gte', 'lt', 'lte'];
    for (const c of conditions) {
      if (queryParser[c]) {
        this.applyConditionals(queryParser, c);
      }
    }

    if (queryParser.btw) {
      this.applyBtwFilter(queryParser);
    }
  }

  private applyConditionals(queryParser: QueryParser, condition: string) {
    for (const [key, value] of Object.entries(queryParser[condition])) {
      queryParser.query[key] = !queryParser.query[key]
        ? { [`$${condition}`]: value }
        : { ...queryParser.query[key], [`$${condition}`]: value };
    }
  }

  private applyBtwFilter(queryParser: QueryParser) {
    for (const [key, value] of Object.entries(queryParser.btw)) {
      if (_.isArray(value)) {
        queryParser.query[key] = { $gte: value[0], $lte: value[1] };
      } else if (_.isObject(value)) {
        const { start, end }: Dict = value || {};
        if (start && end) {
          queryParser.query[key] = { $gte: start, $lte: end };
        }
      }
    }
  }

  private applyDateFilters(queryParser: QueryParser) {
    const dataFilters: string[] = this?.entity?.config?.dateFilters;

    if (dataFilters && dataFilters.length > 0) {
      dataFilters.forEach((key: string) => {
        if (queryParser.query[key]) {
          queryParser.query[key] = Utils.generateDateRange(queryParser.query[key]);
        }
      });
    }
  }

  private applySearchQuery(queryParser: QueryParser) {
    const searchQuery = this.entity.searchQuery(queryParser.search);
    queryParser.query = {
      $or: [...searchQuery],
      ...queryParser.query,
    };
    return queryParser.query;
  }

  private applyPagination(query, pagination: Pagination) {
    return query.skip(pagination.skip).limit(pagination.perPage);
  }

  private applySortQuery(queryParser: QueryParser) {
    const query = _.has(queryParser.sort, ['createdAt']) ? queryParser.sort : { createdAt: -1 };
    return queryParser && queryParser.sort ? Object.assign(queryParser.sort, { ...query }) : '-createdAt';
  }

  private async getCountDocuments(queryParser: QueryParser): Promise<number> {
    return this.model.countDocuments(queryParser.query).exec();
  }

  /**
   * The function `countQueryDocuments` performs an aggregate query on a model and returns the count of
   * documents that match the query.
   * @param query - The `query` parameter is an array of MongoDB aggregation pipeline stages. These
   * stages define the operations to be performed on the data before returning the result.
   * @returns The count of documents that match the given query.
   */
  public async countQueryDocuments(query) {
    let count = await this.model.aggregate(
      query.concat([
        {
          $count: 'total',
        },
      ]),
    );
    count = count[0] ? count[0].total : 0;
    return count;
  }

  /**
   * The function builds a query object for aggregating data from a model, including pagination and
   * sorting options.
   * @param {Pagination} pagination - The `pagination` parameter is an object that contains information
   * about the pagination settings. It typically includes properties such as `skip` (the number of
   * documents to skip) and `perPage` (the number of documents to return per page).
   * @param {any[]} query - The `query` parameter is an array that contains the query conditions for
   * the MongoDB aggregation pipeline. Each element in the array represents a stage in the pipeline.
   * @param {QueryParser} [queryParser=null] - The `queryParser` parameter is an object that contains
   * parsed query parameters. It is used to build the MongoDB aggregation query.
   * @returns an object with two properties: "value" and "count". The "value" property is the result of
   * the aggregation query performed on the model, and the "count" property is the result of counting
   * the documents that match the query.
   */
  public async buildModelAggregateQueryObject(
    pagination: Pagination,
    query: any[] = [],
    queryParser: QueryParser = null,
  ): Promise<any> {
    const count = await this.countQueryDocuments(query);
    query.push({
      $sort: queryParser.sort ? Object.assign({}, { ...queryParser.sort, createdAt: -1 }) : { createdAt: -1 },
    });

    if (!queryParser.getAll) {
      query.push(
        {
          $skip: pagination.skip,
        },
        {
          $limit: pagination.perPage,
        },
      );
    }

    return {
      value: await this.model.aggregate(query).collation({ locale: 'en', strength: 1 }),
      count,
    };
  }

  /**
   * The function retrieves an existing resource based on unique keys from an object.
   * @param obj - An object containing the unique keys and their corresponding values to search for in
   * the database.
   * @returns The function `retrieveExistingResource` returns either the found resource (if it exists)
   * or `null` if no resource is found.
   */
  public async retrieveExistingResource(obj) {
    const query: Dict = {};
    const uniqueKeys = this.entity.config.uniques;
    if (uniqueKeys && uniqueKeys.length > 0) {
      for (const key of uniqueKeys) {
        query[key] = obj[key];
      }
      const cacheKey = this.getCacheKey(uniqueKeys[0]);
      let object = await this.getCacheObject(cacheKey);
      if (_.isUndefined(object)) {
        object = !_.isEmpty(query)
          ? await this.model.findOne({
              ...Utils.conditionWithDelete(query),
            })
          : false;

        this.cacheObjectIfFound(object, cacheKey);
      }
      return object;
    }
    return null;
  }

  /**
   * The function validates an object by checking if it exists in the model based on certain
   * conditions.
   * @param payload - The `payload` parameter is a record object that contains key-value pairs. It is
   * used to specify the conditions for validating an object.
   * @returns The `validateObject` function returns a promise that resolves to the result of the
   * `findOne` method call on the `model` object.
   */
  public async validateObject(payload: Dict) {
    const condition: Dict = Utils.conditionWithDelete({
      $or: [{ publicId: payload._id }, { _id: payload._id }],
    });

    return this.model.findOne(condition);
  }

  /**
   * The function searches for one object based on the provided query parameters, with an option to
   * sort the results based on a latest query.
   * @param query - The `query` parameter is an object that contains the search criteria for finding an
   * object in the database. It can have any number of key-value pairs, where the keys represent the
   * fields to search for and the values represent the values to match against those fields. The
   * `latest` property is a string
   * @returns the result of executing the query on the model.
   */
  public async searchOneObject(query: Record<string, any>) {
    const queryParams = _.omit(query, ['latest']);
    const queryToExec = this.model.findOne({ ...queryParams });
    if (query.latest) {
      try {
        const latestQuery = JSON.parse(query.latest);
        queryToExec.sort({ ...latestQuery });
      } catch (e) {}
    }
    return queryToExec.exec();
  }

  /**
   * The function findByUniqueKey returns distinct values for a given key, filtering by additional
   * parameters and excluding deleted items.
   * @param key - The "key" parameter is used to specify the field or property in the model that you
   * want to find distinct values for.
   * @param params - The `params` parameter is an optional object that allows you to pass additional
   * query parameters to the `findByUniqueKey` method. These parameters will be used to filter the
   * results returned by the `distinct` method.
   * @returns The method `findByUniqueKey` is returning a promise that resolves to the distinct values
   * of the specified `key` from the `model` collection, filtered by the provided `params` object and
   * where the `deleted` field is set to `false`.
   */
  public async findByUniqueKey(key, params = {}) {
    const cacheKey = this.getCacheKey(key);
    let object = await this.getCacheObject(cacheKey);
    if (_.isUndefined(object)) {
      object = this.model.distinct(key, { ...Utils.conditionWithDelete(params) });
      this.cacheObjectIfFound(object, cacheKey);
    }
    return object;
  }

  /**
   * @param {Object} payload request body with ids
   */
  async deleteMany(payload) {
    try {
      const { ids } = payload;
      const deleted = [];
      if (ids?.length) {
        const objects = await this.model.find({
          _id: { $in: [...ids] },
          deleted: false,
        });
        const isSoftDelete = this.entity.config.softDelete;
        for (let object of objects) {
          if (isSoftDelete) {
            _.extend(object, { deleted: true });
            object = await object.save();
          } else {
            object = await object.remove();
          }
          deleted.push(object._id);
        }
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
