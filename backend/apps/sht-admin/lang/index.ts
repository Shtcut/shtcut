import * as _ from 'lodash';
import { HttpException, HttpStatus } from '@nestjs/common';
import { configuration } from '@config';

const language = configuration().app.lang;

/**
 * @param {Object} prop The password to compare against
 * @return {Object} return property
 */
function get(prop) {
  if (this.hasOwnProperty(prop)) return this[prop];
  else
    throw new HttpException(
      `There's no property defined as ${prop} in your translations`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
}

const lang = {
  get,
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const obj = require(`./${language}`).default;
_.each(Object.getOwnPropertyNames(obj), function (property) {
  const prop = property;
  lang[prop] = Object.assign({}, obj[prop], { get });
});

export default lang;
