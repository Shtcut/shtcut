import Link from 'next/link';



const NavLink = ({ children, href, ...props}) => (
    <Link href={href} {...props} className={`py-2.5 px-4 text-center`}>
    {children}
    </Link>
)