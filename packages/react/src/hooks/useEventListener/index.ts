import { Func, MaybeRef } from '../../types';
import { _window, isClient, isString, noop, unRef } from '@/utils';
import * as React from 'react';

interface InferEventType<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any;
  removeEventListener(event: Events, fn?: any, options?: any): any;
}

export type WindEventName = keyof WindowEventMap;
export type DocumentEventName = keyof DocumentEventMap;

export type GeneralEventListener<E = Event> = {
  (evt: E): void;
};

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * @param event
 * @param listener
 * @param options
 *
 * @returns Clean up function for manual cleanup
 */
// @ts-ignore
export function useEventListener<E extends keyof WindowEventMap>(
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions,
): Func;

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 *
 * @returns Clean up function for manual cleanup
 */
// @ts-ignore
export function useEventListener<Names extends string, EventType = Event>(
  target: InferEventType<Names>,
  event: EventType,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions,
): Func;

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 *
 * @returns Clean up function for manual cleanup
 */
// @ts-ignore
export function useEventListener<EventType = Event>(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions,
): Func;

export function useEventListener(...args: any[]) {
  let target: MaybeRef<EventTarget | null | undefined> = _window;
  let event: string;
  let listener: EventListener;
  let options: boolean | AddEventListenerOptions;

  isString(args[0]) ? ([event, listener, options] = args) : ([target, event, listener, options] = args);

  const savedListener = React.useRef<EventListener>(listener);
  const cleanup = React.useRef(noop);

  React.useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  React.useEffect(() => {
    const el = unRef(target);

    if (!isClient || !el) return;

    el.addEventListener(event, savedListener.current, options);
    cleanup.current = () => {
      el.removeEventListener(event, savedListener.current, options);
    };

    return cleanup.current;
  }, [event, target, options]);
}
