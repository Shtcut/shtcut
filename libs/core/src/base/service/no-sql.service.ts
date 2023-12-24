import * as _ from 'lodash';
import { ClientSession } from 'mongoose';
import { AppException, BaseAbstract, Pagination, QueryParser, Utils } from 'shtcut/core';

export class NoSQLBaseService extends BaseAbstract {
  /**
   * The constructor function initializes the model and sets the entity's configuration based on the
   * provided model.
   * @param model - The `model` parameter is an object that represents a collection in a database. It
   * contains information about the collection, such as its name and configuration.
   */
  constructor(protected model) {
    super();
    this.modelName = model.collection.collectionName;
    this.entity = model;
    if (!this?.entity?.config) {
      this.entity.config = { ...this.defaultConfig };
    } else {
      if (this.entity.config instanceof Function) {
        this.entity.config = Object.assign(this.defaultConfig, this.entity.config());
      } else {
        this.entity.routes = Object.assign(this.routes, this.entity.routes);
        this.entity.config = Object.assign(this.defaultConfig, this.entity.config);
      }
    }
  }

  /**
   * The function creates a new object by picking specific properties from the input object, assigning
   * a user ID if provided, generating a unique ID, and saving the data to the database.
   * @param obj - The `obj` parameter is an object that contains the data to be used for creating a new
   * object. It can have any number of properties.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a MongoDB session for the database operations performed
   * within the `createNewObject` method. If a session is provided, the method will use that session to
   * save the data to the database. If no session
   * @returns a Promise that resolves to the saved data object.
   */
  public async createNewObject(obj: Record<string, any>, session?: ClientSession) {
    const toFill = this.entity.config.fillables;
    let payload = { ...obj };
    if (toFill && toFill.length > 0) {
      payload = _.pick(obj, ...toFill);
    }
    if (obj.userId) {
      payload.user = obj.userId;
    }
    const data = new this.model({
      ...payload,
      publicId: Utils.generateUniqueId(this.defaultConfig.idToken),
    });
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
  public async updateObject(id: string, obj: Record<string, any>, session?: ClientSession) {
    const toFill = this.entity.config.updateFillables;
    if (toFill && toFill.length > 0) {
      obj = _.pick(obj, ...toFill);
    }
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
   * The function updates an object by merging the properties of another object into it, and then saves
   * the updated object to the database.
   * @param {any} current - The `current` parameter is the current object that you want to update. It
   * represents the existing data that you want to modify.
   * @param obj - The `obj` parameter is an object that contains the updated values for the `current`
   * object. It is of type `Record<string, any>`, which means it can have any number of properties with
   * any value types.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It represents a MongoDB session that can be used to perform multiple operations
   * within a transaction. If a session is provided, the `current` object will be saved within that
   * session. If no session is provided, the `current`
   * @returns a Promise that resolves to the saved "current" object.
   */
  public async patchUpdate(current: any, obj: Record<string, any>, session?: ClientSession) {
    const toFill = this.entity.config.updateFillables;
    if (toFill && toFill.length > 0) {
      obj = _.pick(obj, ...toFill);
    }
    _.merge(current, obj);
    return session ? await current.save({ session }) : await current.save();
  }

  /**
   * The function `findObject` searches for an object in a model based on its ID or public ID, and
   * returns the object if found.
   * @param {unknown} id - The `id` parameter is the identifier of the object you want to find. It can
   * be either a string or an ObjectId.
   * @param {QueryParser | Record<string, any>} [query] - The `query` parameter is an optional
   * parameter that can be either a `QueryParser` object or a record of type `Record<string, any>`. It
   * is used to specify additional query conditions or population options for the `findOne` method.
   * @returns an object that matches the specified condition.
   */
  public async findObject(id: unknown, query?: QueryParser | Record<string, any>) {
    const condition = {
      deleted: false,
    };
    if (!_.isString()) {
      id = String(id);
    }
    if (Utils.isObjectId(id)) {
      condition['_id'] = id;
    } else {
      condition['publicId'] = id;
    }
    console.log('condition:::', condition);
    const object = await this.model.findOne(condition).populate(query.population || []);
    if (!object) {
      throw AppException.NOT_FOUND(`${this.modelName} does not exist`);
    }
    return object;
  }

  /**
   * The function deletes an object from a database, either by setting a "deleted" flag or by removing
   * it completely, and returns the deleted object.
   * @param object - The "object" parameter is a record or object that represents the data to be
   * deleted. It can be of any type and contains key-value pairs of properties and their corresponding
   * values.
   * @returns the deleted object.
   */
  public async deleteObject(object: Record<string, any>) {
    if (this.entity.config.softDelete) {
      _.extend(object, { deleted: true });
      object = await object.save();
    } else {
      object = await object.remove();
    }
    if (!object) {
      throw AppException.NOT_FOUND;
    }
    return object;
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
  public async buildModelQueryObject(pagination: Pagination, queryParser: QueryParser) {
    const dataFilters: string[] = this?.entity?.config?.dateFilters;

    if (dataFilters && dataFilters.length > 0)
      [
        dataFilters.forEach((key: string) => {
          if (queryParser.query[key]) {
            queryParser.query[key] = Utils.generateDateRange(queryParser.query[key]);
          }
        }),
      ];

    const conditions: string[] = ['gt', 'gte', 'lt', 'lte'];
    for (const c of conditions) {
      if (queryParser[c]) {
        // Using Conditionals for filtering values
        for (const [key, value] of Object.entries(queryParser[c])) {
          queryParser.query[key] = !queryParser.query[key]
            ? { [`$${c}`]: value }
            : { ...queryParser.query[key], [`$${c}`]: value };
        }
      }
    }

    if (queryParser.btw) {
      // Using Btw to filter range of values
      for (const [key, value] of Object.entries(queryParser.btw)) {
        if (_.isArray(value)) {
          queryParser.query[key] = { $gte: value[0], $lte: value[1] };
        } else if (_.isObject(value)) {
          const { start, end }: Record<string, any> = value || {};
          if (start && end) {
            queryParser.query[key] = { $gte: start, $lte: end };
          }
        }
      }
    }

    let query = this.model.find(queryParser.query);
    if (queryParser.search && this.entity.searchQuery && this.entity.searchQuery(queryParser.search).length > 0) {
      const searchQuery = this.entity.searchQuery(queryParser.search);
      queryParser.query = {
        $or: [...searchQuery],
        ...queryParser.query,
      };
      query = this.model.find({ ...queryParser.query });
    }

    if (!queryParser.getAll) {
      query = query.skip(pagination.skip).limit(pagination.perPage);
    }

    query = query.sort(
      queryParser && queryParser.sort ? Object.assign(queryParser.sort, { createdAt: -1 }) : '-createdAt',
    );
    return {
      value: await query.select(queryParser.selection).exec(),
      count: await this.model.countDocuments(queryParser.query).exec(),
    };
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
    const query: Record<string, any> = {};
    if (this.entity.config.uniques) {
      const uniqueKeys = this.entity.config.uniques;
      for (const key of uniqueKeys) {
        query[key] = obj[key];
      }
    }

    const found = !_.isEmpty(query)
      ? await this.model.findOne({
          ...query,
          deleted: false,
        })
      : false;

    return found ? found : null;
  }

  /**
   * The function validates an object by checking if it exists in the model based on certain
   * conditions.
   * @param payload - The `payload` parameter is a record object that contains key-value pairs. It is
   * used to specify the conditions for validating an object.
   * @returns The `validateObject` function returns a promise that resolves to the result of the
   * `findOne` method call on the `model` object.
   */
  public async validateObject(payload: Record<string, any>) {
    const moreCondition = { deleted: false };

    const condition: Record<string, any> = {
      $or: [{ publicId: payload._id }, { _id: payload._id }],
      ...moreCondition,
    };

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
    return this.model.distinct(key, { ...params, deleted: false });
  }
}
