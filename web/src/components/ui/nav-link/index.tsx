import { CommonProps } from '@shtcut-ui/react';
import Link from 'next/link';

interface NavLinkProps extends CommonProps {
    href: string;
}

export const NavLink = ({ children, className, href, ...props }: NavLinkProps) => (
    <Link href={href} {...props} className={className ?? 'py-2.5 px-4 text-center'}>
        {children}
    </Link>
);
