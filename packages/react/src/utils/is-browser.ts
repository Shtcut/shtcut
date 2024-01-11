export const isBrowser = () =>
  typeof window !== 'undefined' && 'document' in window && 'createElement' in window.document;
