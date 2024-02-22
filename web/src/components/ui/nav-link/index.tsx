import { cn } from '@shtcut-ui/react';
import Link from 'next/link';

export const NavLink = ({ children, href, ...props }) => (
    <Link href={href} {...props} className={props.className ?? 'py-2.5 px-4 text-center'}>
        {children}
    </Link>
);
