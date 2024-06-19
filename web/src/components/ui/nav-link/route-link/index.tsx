import { cn } from '@shtcut-ui/react';
import Link from 'next/link';

const RouteLink = ({ href, isDisabled, children, className, ...props }) => {
    const handleClick = (e: { preventDefault: () => void }) => {
        if (isDisabled) {
            e.preventDefault();
        }
    };

    return (
        <Link href={isDisabled ? '#' : href} legacyBehavior>
            <a
                onClick={handleClick}
                aria-disabled={isDisabled}
                className={cn(className, isDisabled && 'cursor-not-allowed ')}
                {...props}
            >
                {children}
            </a>
        </Link>
    );
};
export default RouteLink;
