import { Context, createContext as ReactCreateContext, useContext as ReactUseContext, Provider } from 'react';
import { Dict } from '../types';

export type CreateContextOptions = {
  name: string;
  strict?: boolean;
  errorMessage?: string;
};

type CreateContextReturn<T> = [Provider<T>, () => T, Context<T>];

export function createContext<ContextValueType>(options: CreateContextOptions) {
  const { name, strict = true, errorMessage } = options;

  const Context = ReactCreateContext<ContextValueType | undefined>(undefined);

  const useContext = () => {
    const context = ReactUseContext(Context);

    if (context == undefined && strict) {
      const error = new Error(
        errorMessage ??
          `use${name.replace(
            'Context',
            '',
          )} return \`undefined\`. Seems you forgot to wrap component within ${name.replace('Context', 'Provider')}`,
      );

      error.name = 'Context';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }
    return context;
  };
  return [Context.Provider, useContext, Context] as CreateContextReturn<ContextValueType>;
}
