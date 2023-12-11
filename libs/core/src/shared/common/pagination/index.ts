import * as queryString from 'query-string';
import * as Url from 'url-parse';
import { PaginationOption } from 'shtcut/core';

/**
 * The Pagination class
 */
export class Pagination {
  _queryData: any;
  private pagination: PaginationOption = { totalCount: 0 };
  private urlObj: URL;
  private query: any;

  /**
   * @constructor
   * @param {String} requestUrl This is a query object
   * @param {String} url This is a query object
   * @param {String} itemsPerPage This is a query object
   */
  constructor(
    private requestUrl: string,
    url: string,
    itemsPerPage = 10,
  ) {
    // Default pagination object
    this.urlObj = new Url(`${url}${requestUrl}`);
    const urlObj = this.urlObj as Url<any>;
    const search = urlObj.query;
    // Parse the query string into object
    this.query = queryString.parse(search);
    // Grab the pagination object from the query object

    // The Limit(count to be returned)
    this._perPage = this.query && this.query.perPage ? parseInt(this.query.perPage, 10) : itemsPerPage;
    this.pagination.perPage = this._perPage;

    // The amount to be skipped
    this._skip = 0;

    const perPage = this.perPage;
    this._queryData = { perPage: perPage.toString() };
    urlObj.set('query', this._queryData);

    // Current page number
    this._current = this.query && this.query.page ? parseInt(this.query.page, 10) : 1;
    const page = this._current;
    if (page && page > 1) {
      const urlObj: Url = this.urlObj;
      const previous = page - 1;
      this._skip = previous * perPage;
      this.pagination.previous = previous;
      urlObj.set('query', { ...this._queryData, page: previous.toString() });
      this.pagination.previousPage = urlObj.href;
    }
    this.pagination.current = page; // <= 0 ? 1 : page;
    urlObj.set('query', {
      ...this._queryData,
      page: this.pagination.current.toString(),
    });
    this.pagination.currentPage = urlObj.href;
  }

  _perPage: number;

  /**
   * @return {Number}
   */
  get perPage() {
    return this._perPage;
  }

  /**
   * @param {Number} count The amount of items to skip
   * @return {void}
   */
  set perPage(count) {
    this._perPage = count;
  }

  _current: number;

  /**
   * @return {Number}
   */
  get current() {
    return this._current;
  }

  _skip: number;

  /**
   * @return {Number}
   */
  get skip() {
    return this._skip;
  }

  /**
   * @param {Number} count The amount of items to skip
   * @return {void}
   */
  set skip(count) {
    this._skip = count;
  }

  /**
   * @param {Number} page The next page number
   * @return {void}
   */
  set next(page) {
    const urlObj: Url = this.urlObj;
    this.pagination.next = page;
    urlObj.set('query', { ...this._queryData, page: page.toString() });
    this.pagination.nextPage = urlObj.href;
  }

  /**
   * @param {boolean} boolean Checks if there are more items
   * @return {void}
   */
  set more(boolean) {
    this.pagination.more = boolean;
  }

  /**
   * @return {int} total count
   */
  get totalCount() {
    return this.pagination.totalCount;
  }

  /**
   * @param {Number} count The total count of items
   * @return {void}
   */
  set totalCount(count) {
    this.pagination.totalCount = count;
  }

  /**
   * @param {Number} count The total count of items
   * @return {Boolean}
   */
  morePages(count) {
    return count > this._perPage * this._current;
  }

  /**
   * @return {Object}
   */
  done() {
    return this.pagination;
  }
}
