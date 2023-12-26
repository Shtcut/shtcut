export * from './directives';
export * from './guards';
export * from './middlewares';
export * from './processors';
export * from './proxy';
export * from './services';
export * from './types';
export * from './core.module';

export const getGateWayProxyHeader = (headers) => {
  return {
    'x-api-key': headers['x-api-key'],
    authorization: headers['authorization'],
  };
};

export const processServiceError = (error) => {
  if (error.response) {
    if (error.response.data && error.response.data.meta) {
      const updateError = error.response.data;
      if (updateError.meta?.error?.messages) {
        updateError.meat.error.messages = JSON.stringify(updateError.meta?.error?.messages);
      }
      return updateError;
    }
  }
};
