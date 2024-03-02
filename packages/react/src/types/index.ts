import type { CSSProperties, MutableRefObject, ReactNode } from 'react';

export type Dict<T = any> = Record<string, T>;

export type Booleanish = boolean | 'true' | 'false';

export type Merge<T, P> = P & Omit<T, keyof P>;

export type CSSMap = Dict<{ value: string; var: string; varRef: string }>;

export type WithCSSVar<T> = T & {
  __cssVars: Dict;
  __cssMap: CSSMap;
};

export type DeepPartials<T> = {
  [P in keyof T]?: DeepPartials<T[P]>;
};

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never;


export type MaybeRef<T> = T | MutableRefObject<T>;

export type Func<T = void> = () => T;

export type NumberSize = number | TypeAttributes.Size;

export interface CommonProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export type WithProps = CommonProps;

export declare namespace TypeAttributes {
  type Size = 'lg' | 'md' | 'sm' | 'xs' | 'xl';
  type Shape = 'round' | 'circle' | 'none';
  type Status = 'success' | 'warning' | 'danger' | 'info';
  type FormLayout = 'horizontal' | 'vertical' | 'inline';
  type ControlSize = 'lg' | 'md' | 'sm';
  type MenuVariant = 'light' | 'dark' | 'themed' | 'transparent';
  type Direction = 'ltr' | 'rtl';
}

export type ColorLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type  NotificationPlacement = 
 | 'top-start'
 | 'top-center'
 | 'top-end'
 | 'bottom-start'
 | 'bottom-center'
 | 'bottom-end'
