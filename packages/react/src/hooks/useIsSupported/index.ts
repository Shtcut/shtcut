import * as React from 'react';
import { Func } from '../../types';
import { useMount } from '../useMount';

export function useIsSupported(predicate: Func<boolean>) {
  const [isSupported, setIsSupported] = React.useState(false);

  useMount(() => {
    setIsSupported(predicate());
  });
  return isSupported;
}
