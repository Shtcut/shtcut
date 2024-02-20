import * as React from 'react';
import { useIsSupported } from '../useIsSupported';
import { _navigator } from '../../utils';;
import { useMount } from '../useMount';
import { useEventListener } from '../useEventListener';

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | 'fast' | undefined;

export interface NetworkInformation extends EventTarget {
  readonly effectiveType?: NetworkEffectiveType;
  readonly downlinkMax?: number;
  readonly downlink?: number;
  readonly rtt?: number;
  readonly saveData?: boolean;
  onChange?: EventListener;
}

export function useNetwork() {
  const navConnection = (_navigator as any)?.connection;
  const isSupported = useIsSupported(() => !!navConnection);
  const [isOnline, setIsOnline] = React.useState(true);
  const [offlineAt, setOfflineAt] = React.useState<number | undefined>(undefined);

  const connection = React.useRef<NetworkInformation | undefined>(undefined);
  const rerender = React.useState({})[1];

  useMount(() => {
    if (!_navigator) return;

    setIsOnline(_navigator.onLine);
    setOfflineAt(isOnline ? undefined : Date.now());

    if (!navConnection) return;

    connection.current = navConnection;

    // @ts-ignore
    connection.current?.onChange = () => rerender({});
  });

  useEventListener('offline', () => {
    setIsOnline(false);
    setOfflineAt(Date.now());
  });

  useEventListener('online', () => {
    setIsOnline(true);
  });

  return {
    isSupported,
    isOnline,
    offlineAt,
    saveData: connection.current?.saveData,
    rtt: connection.current?.rtt,
    downlink: connection?.current?.downlink,
    effectiveType: connection?.current?.effectiveType,
  };
}
