'use client';

import { useEffect, useState } from 'react';

interface LocalStorageProps<T> {
    key: string;
    defaultValue: T;
}

export function useLocalStorage<T>({ defaultValue, key }: LocalStorageProps<T>) {
    const [value, setValue] = useState(() => {
        const storeValue = localStorage.getItem(key);
        return storeValue !== null ? (JSON.parse(storeValue) as T) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue] as const;
}
