import * as React from 'react';
import { useEventListener } from '../useEventListener';

export function useOnline() {
  const [isOnline, setIsOnline] = React.useState(true);

  useEventListener('offline', () => {
    setIsOnline(false);
  });

  useEventListener('online', () => {
    setIsOnline(true);
  });

  return {
    isOnline,
  };
}
