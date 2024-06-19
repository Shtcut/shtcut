import { MutableRefObject } from 'react';
import { MaybeRef } from '../../types';
import { isRef, isString } from '../assertion';

/**
 * The `rand` function generates a random integer within a specified range.
 * @param {number} min - The `min` parameter represents the minimum value of the range from which you
 * want to generate a random number.
 * @param {number} max - The `max` parameter in the `rand` function represents the maximum value that
 * you want to generate a random number up to (inclusive).
 * @returns The `rand` function returns a random integer between the `min` and `max` values
 * (inclusive).
 */
export const rand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * The `noop` function is an empty arrow function in TypeScript.
 */
export const noop = () => {};

/**
 * The `unRef` function in TypeScript returns the unwrapped value of a ref or the original value if not
 * a ref.
 * @param target - The `target` parameter in the `unRef` function is a value that can be either a ref
 * or a regular value. It is of type `MaybeRef<T>`, where `T` is a generic type that defaults to
 * `HTMLElement`.
 * @returns The function `unRef` returns the unwrapped value of the provided `target`. If the `target`
 * is a ref object, it returns the `current` value of the ref. If the `target` is not a ref object, it
 * simply returns the `target` itself.
 */
export function unRef<T = HTMLElement>(target: MaybeRef<T>): T {
  const element = isRef(target) ? (target as MutableRefObject<T>).current : (target as T);
  return element;
}

/**
 * The function `capitalize` takes a string as input and returns the same string with the first letter
 * capitalized.
 * @param {string} value - A string that you want to capitalize.
 * @returns The function `capitalize` takes a string as input and returns the same string with the
 * first letter capitalized. If the input is not a string, an empty string is returned.
 */
export function capitalize(value: string) {
  return !isString(value) ? '' : `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function chainedFunction<T = any>(...funcs: (T | null)[]) {
  return funcs
    .filter((f) => f !== null && typeof f !== 'undefined')
    .reduce((acc: any, f: any) => {
      if (typeof f !== 'function') {
        throw new Error('Invalid Argument Type, must only provide functions, undefined, or null');
      }
      if (acc === undefined) {
        return f;
      }
      return function chainedFunction(this: any, ...args: any[]) {
        acc.apply(this, args);
        f.apply(this, args);
      };
    }, undefined);
}
