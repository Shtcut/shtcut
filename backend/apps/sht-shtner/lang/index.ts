import * as _ from 'lodash';
import { HttpException } from '@nestjs/common';
import { configuration } from '@config';
import { INTERNAL_SERVER_ERROR } from 'shtcut/core';

const language = configuration().app.lang;

/**
 * @param {Object} prop The password to compare against
 * @return {Object} return property
 */
function get(prop) {
  if (this.hasOwnProperty(prop)) return this[prop];
  else throw new HttpException(`There's no property defined as ${prop} in your translations`, INTERNAL_SERVER_ERROR);
}

const lang = { get };

const obj = require(`./${language}`).default;
_.each(Object.getOwnPropertyNames(obj), function (property) {
  const prop = property;
  lang[prop] = Object.assign({}, obj[prop], { get });
});

export default lang;
