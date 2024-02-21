import { cn } from '@shtcut-ui/react';
import Link from 'next/link';

const NavLink = ({ children, href, ...props }) => (
    <Link href={href} {...props} className={cn('py-2.5 px-4 text-center', props.className)}>
        {children}
    </Link>
);

export default NavLink;
