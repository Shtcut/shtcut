import * as React from 'react';

export type UseTimeoutReturn = {
    clear: () => void;
    reset: () => void;
};

export function useTimeout(fn: () => void, ms = 0, enabled = true): UseTimeoutReturn {
    const timeout = React.useRef<ReturnType<typeof setTimeout>>();
    const callback = React.useRef(fn);

    const clear = React.useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
    }, []);

    const set = React.useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
        if (enabled) {
            timeout.current = setTimeout(() => {
                callback.current?.();
            }, ms);
        }
    }, [ms, enabled]);

    React.useEffect(() => {
        callback.current = fn;
    }, [fn]);

    React.useEffect(() => {
        set();
        return clear;
    }, [ms, enabled, set, clear]);

    return { clear, reset: set };
}
