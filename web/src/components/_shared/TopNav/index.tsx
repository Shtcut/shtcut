import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, cn } from '@shtcut-ui/react';
import { IconMenu } from '@tabler/icons-react';
import Link from 'next/link';

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
    links: {
        title: string;
        href: string;
        module: string;
        isActive: boolean;
        icon?: JSX.Element;
    }[];
}

export const TopNav = ({ className, links, ...props }: TopNavProps) => {
    return (
        <>
            <div className="md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <IconMenu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start">
                        {links.map(({ title, href, isActive }) => (
                            <DropdownMenuItem key={`${title}-${href}`} asChild>
                                <Link href={href} className={!isActive ? 'text-muted-foreground' : ''}>
                                    {title}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <nav className={cn('hidden items-cent space-x-4 md:flex lg:space-x-6', className)} {...props}>
                {links.map(({ title, href, isActive }) => (
                    <Link
                        key={`${title}-${href}`}
                        href={href}
                        className={`text-sm font-medium transition-colors hover:text-pretty ${
                            isActive ? '' : 'text-muted-foreground'
                        }`}
                    >
                        {title}
                    </Link>
                ))}
            </nav>
        </>
    );
};
