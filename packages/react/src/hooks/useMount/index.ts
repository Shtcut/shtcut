import { Func } from '../../types';;
import { useEffect } from 'react';

export function useMount(callback: Func) {
  useEffect(callback, []);
}
