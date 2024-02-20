import { Dict } from '../../types';

const toString = Object.prototype.toString;

export const isClient = typeof window !== 'undefined';

/**
 * The function checks if a value is an array.
 * @param {any} value - The `value` parameter is the variable that you want to check if it is an array.
 * @returns a boolean value.
 */
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value);
}

/**
 * The function checks if a value is an object (excluding arrays).
 * @param {any} value - The parameter "value" is of type "any", which means it can accept any value.
 * @returns a boolean value.
 */
export function isObject(value: any): value is Dict {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function') && !isArray(value);
}

/**
 * The function `isBoolean` checks if a value is of type boolean.
 * @param {unknown} value - The `value` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * The function checks if a value is a number.
 * @param {unknown} value - The `value` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * The function `isString` checks if a value is of type string.
 * @param {unknown} value - The parameter "value" is of type "unknown", which means it can be any type.
 * @returns a boolean value.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * The function checks if a value is a function.
 * @param {unknown} value - The `value` parameter is of type `unknown`, which means it can be any type.
 * @returns a boolean value indicating whether the input value is a function or not.
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * The function checks if a value is an input event object with a target property of type
 * HTMLInputElement.
 * @param {any} value - The `value` parameter is of type `any`, which means it can accept any value.
 * @returns a boolean value.
 */
export function isInputEvent(value: any): value is { target: HTMLInputElement } {
  return value && isObject(value) && isObject(value.target);
}

/**
 * The function `isWindow` checks if a value is a Window object in a client-side environment.
 * @param {any} val - The `val` parameter in the `isWindow` function is a variable of any type that
 * will be checked if it is a `Window` object.
 */
export const isWindow = (val: any): val is Window => isClient && toString.call(val) === '[object Window]';

/**
 * The function `isRef` checks if an object is a reference with a `current` property.
 * @param {unknown} obj - The `obj` parameter in the `isRef` function is of type `unknown`, which means
 * it can be any type. The function checks if the `obj` is not `null`, is an object, and has a property
 * named `current`. If all these conditions are met, the function
 */
export const isRef = (obj: unknown): boolean =>
  obj !== null && isObject(obj) && Object.prototype.hasOwnProperty.call(obj, 'current');

export const _window = /** #__PURE__ */ isClient ? window : undefined;
export const _document = /** #__PURE__ */ isClient ? window.document : undefined;
export const _navigator = /** #__PURE__ */ isClient ? window.navigator : undefined;
export const _location = /** #__PURE__ */ isClient ? window.location : undefined;

export const __DEV__ = process.env.NODE_ENV !== 'production';
