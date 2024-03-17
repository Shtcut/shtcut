import { usePathname } from 'next/navigation';

export const useCheckActiveNav = () => {
    const pathname = usePathname();

    const checkActiveNav = (nav: string, defaultPath = '/') => {
        const pathArray = pathname.split('/').filter((item) => item !== '');
        if (defaultPath === '/' && pathArray.length > 1) return true;

        return pathArray.includes(nav.replace(/^\//, ''));
    };

    return { checkActiveNav };
};
