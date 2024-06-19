function cartesian(array) {
  function* cartesian(head, ...tail) {
    let remainder = tail.length ? cartesian(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
  }
  return [...cartesian(...array)];
}

/**
 * The function `deepKeys` recursively retrieves all keys in a nested object structure, using a
 * specified separator and optional prefix.
 * @param object - The `object` parameter in the `deepKeys` function is the object for which you want
 * to retrieve all the deep keys.
 * @param [separator=.] - The `separator` parameter in the `deepKeys` function is used to specify the
 * character or string that separates keys in the nested object structure. By default, the separator is
 * set to `'.'`, but you can provide a different separator if needed. This allows you to customize how
 * the keys are concatenated
 * @param [prefix] - The `prefix` parameter in the `deepKeys` function is used to keep track of the
 * current key path as we recursively traverse the object. It is initially an empty string and gets
 * updated as we go deeper into nested objects or arrays.
 * @returns The function `deepKeys` returns an array of all the keys in the input `object`, including
 * keys of nested objects. The keys are concatenated with the `prefix` and separated by the
 * `separator`. If a key corresponds to an array, it is included as is in the result array.
 */
function deepKeys(object, separator = '.', prefix = '') {
  return Object.keys(object).reduce((result, key) => {
    if (Array.isArray(object[key])) {
      return [...result, prefix + key];
    } else if (typeof object[key] === 'object' && object[key] !== null) {
      return [...result, ...deepKeys(object[key], separator, prefix + key + separator)];
    }
    return [...result, prefix + key];
  }, []);
}

const extractTokens = (pattern) => pattern.split(/(?={[^}]+})|(?<={[^}]+})/);

/* The `expandTokens` function is defined as a higher-order function that takes a `theme` function as
an optional parameter. If no `theme` function is provided, it defaults to an empty function that
returns an empty object `{}`. */
const expandTokens = (theme) => (tokens) => {
  return tokens.map((token) => {
    if (token.startsWith('{')) {
      const cleanToken = token.replace(/{|}/g, '');
      if (cleanToken.includes('.')) {
        const color = cleanToken.split('.')[1];
        const colorToken = {
          [color]: theme(cleanToken, {}),
        };
        return deepKeys(colorToken, '-');
      }
      return deepKeys(theme(cleanToken, {}), '-');
    } else {
      return [token];
    }
  });
};

const mapToClasses = (expanded) => expanded.map((val) => val.join('.').replace('-DEFAULT', ''));

module.exports = (theme) => (patterns) => {
  return patterns.map(extractTokens).map(expandTokens(theme)).map(cartesian).flatMap(mapToClasses);
};
