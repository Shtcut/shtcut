import * as _ from 'lodash';
import mongoose from 'mongoose';

/**
 * The QueryParser class
 */
export class QueryParser {
  private _all;
  private _filters;
  private _exclude;
  private _sort;
  private _lte;
  private _lt;
  private _gt;
  private _gte;
  private _btw;
  private _selection;
  private _page;
  private _search;

  /**
   * @constructor
   * @param {Object} query This is a query object of the request
   */
  constructor(public query: any) {
    this.initialize(query);
    const excluded = [
      'perPage',
      'page',
      'limit',
      'sort',
      'all',
      'exclude',
      'filters',
      'selection',
      'population',
      'search',
      'regex',
      'nested',
      'nestedObject',
      'gt',
      'gte',
      'lt',
      'lte',
      'btw',
    ];
    // omit special query string keys from query before passing down to the model for filtering
    this.query = _.omit(this.query, ...excluded);
    // Only get collection that has not been virtually deleted.
    _.extend(this.query, { deleted: false });
    Object.assign(this, this.query);
  }

  /**
   * when String i.e ?sort=name it is sorted by name ascending order
   * when Object ?sort[name]=desc {name: 'desc'} it is sorted by name descending order
   * when Object ?sort[name]=desc,sort[age]=asc {name: 'desc', age: 'asc'} it is sorted by name desc and age asc order
   *
   * @return {Object} get the sort property
   */
  get sort() {
    if (this._sort) {
      if (!_.isEmpty(this._sort)) {
        try {
          this._sort = JSON.parse(this._sort);
        } catch (e) {}
      }
      if (_.isObject(this._sort)) {
        for (const [column, direction] of Object.entries(this._sort)) {
          if (typeof direction === 'string') this._sort[column] = direction.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        }
      } else {
        const sort = {};
        for (const key of this._sort.split(',')) {
          sort[key] = 1;
        }
        return sort;
      }
      return this._sort;
    }
    return { createdAt: 'ASC' };
  }

  /**
   * @return {Object} get the selection property
   */
  get selection() {
    if (this._selection) {
      return this._selection;
    }
    return [];
  }

  /**
   * @return {Object} get the selection property
   */
  get exclude() {
    if (this._exclude) {
      return this._exclude;
    }
    return [];
  }

  /**
   * @param {Object} value is the population object
   */
  set selection(value) {
    this._selection = value;
    if (!_.isObject(value)) {
      try {
        this._selection = JSON.parse(String(value));
      } catch (e) {}
    }
  }

  /**
   * @param {Object} value is the selection object
   */
  set exclude(value) {
    try {
      const exclude = JSON.parse(value);
      this._exclude = Object.values(exclude);
    } catch (e) {
      console.log('exclude-error:', e.getMessages());
    }
  }

  /**
   * @return {Object} get the items to return in each page
   */
  get page() {
    return this._page;
  }

  /**
   * @param {Number} value is the current page number
   */
  set page(value) {
    this._page = value;
  }

  private _skip = 0;
  /**
   * @return {Object} get the no of items to skip
   */
  get skip() {
    return ((this._page <= 0 ? 1 : this._page) - 1) * this._perPage;
  }

  private _perPage: any = null;

  /**
   * @return {Object} get the items to return in each page
   */
  get perPage() {
    return this._perPage;
  }

  /**
   * @param {Number} value is the perPage number
   */
  set perPage(value) {
    this._perPage = value;
  }

  private _population: any;

  /**
   * @return {Object} get the population object for query
   */
  get population() {
    if (this._population) {
      return this._population;
    }
    return null;
  }

  /**
   * @param {Object} value is the population object
   */
  set population(value) {
    this._population = value;
    if (!_.isObject(value)) {
      try {
        this._population = JSON.parse(String(value));
      } catch (e) {}
    }
  }

  /**
   * @return {Object} get the parsed query
   */
  get search() {
    return this._search;
  }

  /**
   * @return {Boolean} get the value for all data request
   */
  get getAll() {
    return this._all;
  }

  /**
   * @return {Object} get the parsed query
   */
  get gt() {
    if (this._gt) {
      try {
        this._gt = JSON.parse(this._gt);
      } catch (e) {}
    }
    return this._gt;
  }

  /**
   * @return {Object} get the parsed query
   */
  get gte() {
    if (this._gte) {
      try {
        this._gte = JSON.parse(this._gte);
      } catch (e) {}
    }
    return this._gte;
  }

  /**
   * @return {Object} get the parsed query
   */
  get lt() {
    if (this._lt) {
      try {
        this._lt = JSON.parse(this._lt);
      } catch (e) {}
    }
    return this._lt;
  }

  /**
   * @return {Object} get the parsed query
   */
  get lte() {
    if (this._lte) {
      try {
        this._lte = JSON.parse(this._lte);
      } catch (e) {}
    }
    return this._lte;
  }

  /**
   * @return {Object} get the parsed query
   */
  get btw() {
    if (this._btw) {
      try {
        this._btw = JSON.parse(this._btw);
      } catch (e) {}
      return this._btw;
    }
  }

  /**
   * @return {Object} get the parsed query
   */
  get filters() {
    return this._filters;
  }

  /**
   * @param {Object} query is the query object
   * @return {Object} the nested query
   * */
  processNestedQuery(query: any | object): any {
    let value = query.nested;
    const result: any = {};
    if (value) {
      try {
        value = JSON.parse(value.toString());
        if (_.isArray(value)) {
          for (const filter of value) {
            if (filter.hasOwnProperty('key') && filter.hasOwnProperty('value')) {
              filter.value = {
                $in: filter.value.in_array.map((v: any) => new mongoose.Types.ObjectId(v)),
              };
            }
            result[filter.key] = filter.value;
          }
        }
        if (_.isObject(value)) {
          return this.processNestedObject(value);
        }
      } catch (e) {
        console.log(e);
      }
    }
    return result;
  }

  /**
   * @param {Object} query is the query object
   * @return {Object} the nested query
   * */
  processRegSearch(query: Record<string, any>) {
    const value = query.regex;
    const result: any = {};
    if (!_.isObject(value)) {
      try {
        const regex = JSON.parse(value.toString());
        for (const r of regex) {
          const q = new RegExp(r.value);
          result[r.key] = { $regex: q, $options: 'i' };
        }
      } catch (e) {
        console.log(e);
      }
    }
    return result;
  }

  private processNestedObject(query) {
    try {
      const ret = {};
      const iter = (obj, path?) => {
        Object.keys(obj).forEach((k) => {
          const v = obj[k];
          if (typeof v !== 'object' || v instanceof Date || v instanceof RegExp || typeof v.toDate === 'function') {
            ret[path ? `${path}.${k}` : k] = typeof v.toDate === 'function' ? v.toDate() : v;
            return;
          }
          iter(v, path ? `${path}.${k}` : k);
        });
      };
      iter(query);
      return ret;
    } catch (e) {
      console.log('nestedObject-err', e);
    }
  }

  /**
   *  Initialize all the special object required for the find query
   *  @param {Object} query This is a query object of the request
   */
  initialize(query) {
    this._all = query.all;
    this._sort = query.sort;
    if (query.population) {
      this.population = query.population;
    }
    if (query.search) {
      this._search = query.search;
    }
    if (query.selection) {
      this.selection = query.selection;
    }
    if (query.exclude) {
      this._exclude = query.exclude;
    }
    if (query.page) {
      this._page = parseInt(query.page);
    }
    if (query.perPage) {
      this._perPage = parseInt(query.perPage);
    }
    if (query.gt) {
      this._gt = query.gt;
    }
    if (query.gte) {
      this._gte = query.gte;
    }
    if (query.lt) {
      this._lt = query.lt;
    }
    if (query.lte) {
      this._lte = query.lte;
    }
    if (query.btw) {
      this._btw = query.btw;
    }
    if (query.filters) {
      try {
        this._filters = JSON.parse(query.filters);
      } catch (e) {
        console.log(e.getMessages());
      }
    }
    if (query.nested) {
      this.query = { ...this.query, ...this.processNestedQuery(query) };
    }
    if (query.regex) {
      this.query = { ...this.query, ...this.processRegSearch(query) };
    }
  }
}
