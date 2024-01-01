import { HttpService } from '@nestjs/axios';
import { DELETE, GET, PATCH, POST, PUT } from 'shtcut/core';
import { getGateWayProxyHeader, processServiceError } from '../index';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export class SharedService {
  protected serviceUrl: string;
  protected model: string;
  protected defaultQuery = {
    population: [],
  };

  constructor(
    protected readonly http: HttpService,
    protected config: ConfigService,
  ) {}

  /**
   * The function takes in a parameter object, extracts the "query" property, merges it with a default
   * query object and the remaining properties of the parameter object, and returns the updated query
   * object.
   * @param params - The `params` parameter is an object that contains key-value pairs. The `query`
   * property within `params` is an object that represents the query parameters. The `rest` property
   * contains any additional properties that are not related to the query.
   * @returns an updated query object. It combines the properties from the `query` object,
   * `this.defaultQuery` object, and the remaining properties from the `params` object.
   */
  getUpdatedQuery(params: Record<string, any>) {
    const { query, ...rest } = params;
    return {
      ...query,
      ...this.defaultQuery,
      ...rest,
    };
  }

  /**
   * The `create` function sends a POST request to a service URL with provided data, headers, and
   * optional query parameters.
   * @param data - The `data` parameter is the payload or body of the request. It contains the data
   * that you want to send to the server.
   * @param headers - The `headers` parameter is an object that contains the headers to be included in
   * the HTTP request. Headers are used to provide additional information about the request, such as
   * the content type or authorization credentials.
   * @param params - The `params` parameter is an optional object that contains additional query
   * parameters to be included in the request URL. It is a key-value pair where the key represents the
   * parameter name and the value represents the parameter value.
   * @returns The `create` function is returning the result of the `sendGenericRequest` function.
   */
  async create(data, headers, params: Record<string, any> = {}) {
    const updatedParams = this.getUpdatedQuery(params);
    return this.sendGenericRequest(`${this.serviceUrl}/${this.model}`, POST, {
      params: updatedParams,
      data,
      headers,
    });
  }

  /**
   * The `find` function sends a generic GET request to a specified service URL with updated query
   * parameters, headers, and returns the response.
   * @param headers - The `headers` parameter is an object that contains any additional headers that
   * you want to include in the request. These headers can be used to provide additional information or
   * authentication credentials to the server.
   * @param params - The `params` parameter is an object that contains query parameters to be included
   * in the request URL. These parameters are typically used to filter or sort the data being
   * requested.
   * @returns the result of the `sendGenericRequest` function call.
   */
  async find(headers = {}, params = {}) {
    const updatedParams = this.getUpdatedQuery(params);
    return this.sendGenericRequest(`${this.serviceUrl}/${this.model}`, GET, {
      params: updatedParams,
      headers,
    });
  }

  /**
   * The `findOne` function sends a GET request to retrieve a specific resource by its ID, with
   * optional headers and query parameters.
   * @param id - The `id` parameter is the identifier of the item you want to find. It is used to
   * specify which item you want to retrieve from the database or server.
   * @param headers - An object containing any additional headers to be included in the request. These
   * headers can be used to provide authentication credentials or specify the content type of the
   * request.
   * @param params - An object containing additional query parameters to be included in the request
   * URL.
   * @returns the result of the `sendGenericRequest` function call.
   */
  async findOne(id, headers = {}, params = {}) {
    const updatedParams = this.getUpdatedQuery(params);
    return this.sendGenericRequest(`${this.serviceUrl}/${this.model}/${id}`, GET, {
      params: updatedParams,
      headers,
    });
  }

  /**
   * The function `updateOne` sends a PUT request to update a resource with the specified ID, using the
   * provided payload, headers, and query parameters.
   * @param id - The `id` parameter is the identifier of the resource that you want to update. It is
   * used to specify which resource should be updated in the database.
   * @param payload - The `payload` parameter is an object that contains the data to be updated. It is
   * optional and defaults to an empty object `{}`.
   * @param headers - An object containing any additional headers to be included in the request.
   * @param params - An object containing query parameters to be included in the request URL.
   * @returns the result of the `sendGenericRequest` function call.
   */
  async updateOne(id, payload = {}, headers = {}, params = {}) {
    const updatedParams = this.getUpdatedQuery(params);
    return this.sendGenericRequest(`${this.serviceUrl}/${this.model}/${id}`, PUT, {
      params: updatedParams,
      data: payload,
      headers,
    });
  }

  /**
   * The function `patchOne` sends a PATCH request to update a resource with the specified ID, using
   * the provided payload, headers, and query parameters.
   * @param id - The `id` parameter is the identifier of the resource that you want to update. It is
   * used to specify which resource should be updated.
   * @param payload - The `payload` parameter is an object that contains the data to be sent in the
   * request body. It is optional and defaults to an empty object `{}`.
   * @param headers - The `headers` parameter is an object that contains any additional headers that
   * you want to include in the request. These headers can be used to provide additional information or
   * authentication credentials to the server.
   * @param params - The `params` parameter is an object that contains query parameters to be included
   * in the request URL. These parameters are typically used for filtering or pagination purposes.
   * @returns the result of the `sendGenericRequest` function.
   */
  async patchOne(id, payload = {}, headers = {}, params = {}) {
    const updatedParams = this.getUpdatedQuery(params);
    return this.sendGenericRequest(`${this.serviceUrl}/${this.model}/${id}`, PATCH, {
      params: updatedParams,
      data: payload,
      headers,
    });
  }

  /**
   * The function `deleteOne` sends a DELETE request to a specific URL with the provided ID, headers,
   * and parameters.
   * @param id - The `id` parameter is the identifier of the item that you want to delete. It is used
   * to specify which item should be deleted from the database.
   * @param headers - An object containing any additional headers to be included in the request.
   * @param params - The `params` parameter is an object that contains additional query parameters to
   * be included in the request URL. These parameters are typically used for filtering or sorting the
   * data.
   * @returns the result of the `sendGenericRequest` function call.
   */
  async deleteOne(id, headers = {}, params = {}) {
    const updatedParams = this.getUpdatedQuery(params);
    return this.sendGenericRequest(`${this.serviceUrl}/${this.model}/${id}`, DELETE, {
      params: updatedParams,
      headers,
    });
  }

  /**
   * The function `findByUniqueKey` sends a generic GET request to a specific URL with updated
   * parameters and headers.
   * @param headers - An object containing any additional headers to be included in the request.
   * @param params - An object containing the query parameters to be sent with the request. These
   * parameters are used to filter the results and find a unique record.
   * @returns the result of the `sendGenericRequest` function call.
   */
  async findByUniqueKey(headers = {}, params = {}) {
    const updatedParams = this.getUpdatedQuery(params);
    return this.sendGenericRequest(`${this.serviceUrl}/${this.model}/me`, GET, {
      params: updatedParams,
      headers,
    });
  }

  /**
   * The function `sendGenericRequest` sends a generic HTTP request with specified URL, method, and
   * options, and returns the response data or handles any errors that occur.
   * @param {string} url - The `url` parameter is the URL of the API endpoint that you want to send the
   * request to.
   * @param {string} method - The `method` parameter is a string that specifies the HTTP method to be
   * used for the request. It can be one of the following: "GET", "POST", "PUT", "PATCH", "DELETE",
   * etc.
   * @param options - The `options` parameter is an object that contains various properties for
   * configuring the request. Some of the properties include:
   * @returns the `response.data` if the request is successful. If there is an error, it is returning
   * the result of the `processServiceError` function.
   */
  protected async sendGenericRequest(url: string, method: string, options: Record<string, any>) {
    try {
      const { pagination, filter, ...rest } = options.params;
      const queryObj = this.getQueryFilter(filter);

      const params = {
        ...pagination,
        ...rest,
        ...queryObj,
      };

      const response = await firstValueFrom(
        this.http.request({
          url,
          method,
          params,
          data: options.data,
          headers: getGateWayProxyHeader(options.headers),
        }),
      );
      return response.data;
    } catch (e) {
      return processServiceError(e);
    }
  }

  /**
   * The function `getQueryFilter` takes an array of key-value pairs and returns an object with the
   * keys and values from the array.
   * @param {Record<string, any>[]} filter - An array of objects, where each object has a "key" and
   * "value" property.
   * @returns an object that is created by reducing the `filter` array. Each element in the `filter`
   * array is an object with a `key` and `value` property. The function accumulates these `key-value`
   * pairs into an object and returns it.
   */
  protected getQueryFilter(filter: Record<string, any>[] = []) {
    return filter.reduce((accum, { key, value }) => {
      accum[key] = value;
      return accum;
    }, {});
  }
}
