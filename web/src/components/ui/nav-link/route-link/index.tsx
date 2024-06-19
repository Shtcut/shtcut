import { cn } from '@shtcut-ui/react';
import Link from 'next/link';
import { AnchorHTMLAttributes, FC, MouseEvent } from 'react';

interface RouteLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    isDisabled?: boolean;
}

const RouteLink: FC<RouteLinkProps> = ({ href, isDisabled = false, children, className, ...props }) => {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (isDisabled) {
            e.preventDefault();
        }
    };

    return (
        <Link href={isDisabled ? '#' : href} legacyBehavior>
            <a
                onClick={handleClick}
                aria-disabled={isDisabled}
                className={cn(className, isDisabled && 'cursor-not-allowed')}
                {...props}
            >
                {children}
            </a>
        </Link>
    );
};

export default RouteLink;
