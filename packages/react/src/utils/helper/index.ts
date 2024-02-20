import { MutableRefObject } from 'react';
import { MaybeRef } from '../../types';
import { isRef } from '../assertion';

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
