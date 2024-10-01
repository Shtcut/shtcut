import { usePathname, useRouter } from 'next/navigation';

const usePricingNavigation = () => {
    const pathName = usePathname();
    const router = useRouter();
    const scrollToPricing = () => {
        if (pathName === '/pricing') {
            const element = document.getElementById('down');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push('/pricing');
            setTimeout(() => {
                const element = document.getElementById('down');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    };
    return {
        scrollToPricing
    };
};

export default usePricingNavigation;
