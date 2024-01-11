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

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
