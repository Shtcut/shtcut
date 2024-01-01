import { SharedService } from '../services';

export class AppProcessor {
  constructor(private sharedService: SharedService) {}

  /**
   * The create function takes in an authentication context, payload, and query, and uses them to
   * create a new item using a shared service, returning the metadata and data of the created item.
   * @param authContext - The authContext parameter is an object that contains information about the
   * authentication context. It typically includes details such as the user's authentication token,
   * user ID, and any other relevant authentication information.
   * @param payload - The `payload` parameter is an object that contains the data needed to create a
   * new item. It could include properties such as the item's name, description, and any other relevant
   * information.
   * @param query - The "query" parameter is typically used to pass additional information or
   * parameters to the create function. It can be an object containing key-value pairs that provide
   * instructions or filters for the create operation. The specific structure and content of the query
   * object would depend on the requirements of the create operation and the sharedService
   * @returns an object with two properties: "meta" and "data".
   */
  async create(authContext, payload, query) {
    const { headers } = authContext;
    const { meta, data } = await this.sharedService.create(payload, headers, query);
    return { meta, data };
  }

  /**
   * The function "find" takes in an authentication context and a query, retrieves data using the
   * shared service, and returns the metadata and data.
   * @param authContext - The authContext parameter is an object that contains information about the
   * authentication context. It typically includes headers, tokens, or other authentication-related
   * data that may be required for making authenticated requests.
   * @param query - The `query` parameter is a variable that represents the search query or filter
   * criteria that will be used to find data. It could be a string, object, or any other data type
   * depending on the implementation of the `find` method.
   * @returns an object with two properties: "meta" and "data".
   */
  async find(authContext, query) {
    const { headers } = authContext;
    const { meta, data } = await this.sharedService.find(headers, query);
    return { meta, data };
  }

  /**
   * The `findOne` function retrieves a single item based on the provided `id`, `headers`, and `query`
   * parameters.
   * @param authContext - The authContext parameter is an object that contains information about the
   * authentication context. It typically includes details such as the user's authentication token,
   * user ID, and any other relevant authentication information.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * item you want to find. It is used to specify which item you want to retrieve from the database or
   * any other data source.
   * @param query - The "query" parameter is an object that contains additional parameters or filters
   * that can be used to refine the search for the item with the specified ID. It can include
   * properties such as sorting options, pagination parameters, or any other criteria that can be used
   * to retrieve the desired item.
   * @returns an object with two properties: "meta" and "data".
   */
  async findOne(authContext, id: string, query) {
    const { headers } = authContext;
    const { meta, data } = await this.sharedService.findOne(id, headers, query);
    return { meta, data };
  }

  /**
   * The function updates a record with the given ID using the provided payload, headers, and query
   * parameters, and returns the updated record along with metadata.
   * @param authContext - The authContext parameter is an object that contains information about the
   * authentication context. It typically includes details such as the user's authentication token,
   * user ID, or any other relevant authentication information.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * item you want to update. It is used to specify which item should be updated in the database.
   * @param payload - The `payload` parameter is the data that you want to update for the specified
   * `id`. It can be an object containing the new values for the fields you want to update.
   * @param query - The "query" parameter is an object that contains additional parameters or filters
   * that can be used to modify the behavior of the update operation. It can be used to specify
   * conditions or options for the update operation, such as specifying which fields to update or
   * filtering the documents to be updated.
   * @returns an object with two properties: "meta" and "data".
   */
  async update(authContext, id: string, payload, query) {
    const { headers } = authContext;
    const { meta, data } = await this.sharedService.updateOne(id, payload, headers, query);
    return { meta, data };
  }

  /**
   * The function `patch` is an asynchronous function that takes in an authentication context, an ID, a
   * payload, and a query, and it uses the shared service to patch a resource with the given ID using
   * the provided payload, headers, and query, and then returns the metadata and data of the patched
   * resource.
   * @param authContext - An object containing information about the authentication context, such as
   * the user's credentials or access token. It is used to authenticate the request and determine the
   * user's permissions.
   * @param {string} id - The `id` parameter is a string that represents the identifier of the resource
   * you want to update. It is used to specify which resource should be updated in the database.
   * @param payload - The `payload` parameter is the data that you want to update for the resource with
   * the specified `id`. It can be an object containing the new values for the resource properties.
   * @param query - The "query" parameter is an object that contains additional information or options
   * for the patch operation. It can be used to specify filters, sorting, pagination, or any other
   * parameters that may be needed for the patch operation.
   * @returns an object with two properties: "meta" and "data".
   */
  async patch(authContext, id: string, payload, query) {
    const { headers } = authContext;
    const { meta, data } = await this.sharedService.patchOne(id, payload, headers, query);
    return { meta, data };
  }

  /**
   * The function deletes a record with a specific ID using authentication headers and returns the
   * metadata and data of the deleted record.
   * @param authContext - The authContext parameter is an object that contains information about the
   * authentication context. It typically includes details such as the user's authentication token or
   * credentials, which can be used to authenticate the user's request.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * item you want to delete.
   * @returns an object with two properties: "meta" and "data".
   */
  async deleteOne(authContext, id: string) {
    const { headers } = authContext;
    const { meta, data } = await this.sharedService.deleteOne(id, headers);
    return { meta, data };
  }
}
