'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';

export function useIsCollapsed () {
    const [isCollapsed, setIsCollapsed] = useLocalStorage({
        key: 'collapsed-sidebar',
        defaultValue: false
    });

    useEffect(() => {
        const handleSize = () => {
            setIsCollapsed(window.innerWidth < 768 ? false : isCollapsed);
        };
        handleSize();

        window.addEventListener('resize', handleSize);

        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, [isCollapsed, setIsCollapsed]);

    return [isCollapsed, setIsCollapsed] as const;
};
