import {
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    CommonProps,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    cn
} from '@shtcut-ui/react';
import { SideLink } from '@shtcut/_shared/data/side-links';
import Link from 'next/link';
import { buttonVariants } from '../index';
import { useCheckActiveNav } from '@shtcut/hooks/useNav';
import { IconChevronDown } from '@tabler/icons-react';

interface NavProps extends CommonProps, React.HtmlHTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean;
    links: SideLink[];
    closeNav: () => void;
}

interface NavLinkProps extends SideLink {
    defaultPath?: string;
    subLink?: boolean;
    closeNav: () => void;
}

const NavLink = ({ label, href, closeNav, icon, title, subLink = false, defaultPath = '/' }: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();
    return (
        <Link
            href={href}
            onClick={closeNav}
            className={cn(
                buttonVariants({
                    variant: checkActiveNav(href, defaultPath) ? 'secondary' : 'ghost',
                    size: 'sm'
                }),
                'h-12 justify-start text-wrap rounded-none px-6',
                subLink && 'h-10 w-full border-l border-l-slate-500 px-2'
            )}
            aria-current={checkActiveNav(href) ? 'page' : undefined}
        >
            <div className="mr-2">{icon}</div>
            {title}
            {label && (
                <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">{label}</div>
            )}
        </Link>
    );
};

const NavLinkDropdown = ({ title, icon, label, sub, closeNav }: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();

    const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

    return (
        <Collapsible defaultOpen={isChildActive}>
            <CollapsibleTrigger
                className={cn(
                    buttonVariants({
                        variant: 'ghost',
                        size: 'sm'
                    }),
                    'group h-12 w-full justify-start rounded-none px-6'
                )}
            >
                <div className="mr-2">{icon}</div>
                {title}
                {label && (
                    <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
                        {label}
                    </div>
                )}
                <span className={cn('ml-auto transition-all group-data-[state="open"]:-rotate-180')}>
                    <IconChevronDown stroke={1} />
                </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="collapsibleDropdown" asChild>
                <ul>
                    {sub!.map((s) => (
                        <li key={s.title} className="my-1 ml-8">
                            <NavLink {...s} subLink closeNav={closeNav} />
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};

const NavLinkIcon = ({ title, icon, label, href, defaultPath }: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={cn(
                        buttonVariants({
                            variant: checkActiveNav(href, defaultPath) ? 'secondary' : 'ghost',
                            size: 'icon'
                        }),
                        'h-12 w-12'
                    )}
                >
                    {icon}
                    <span className="sr-only">{title}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
                {title}
                {label && <span className="ml-auto text-muted-foreground">{label}</span>}
            </TooltipContent>
        </Tooltip>
    );
};

const NavLinkIconDropdown = ({ title, icon, label, sub }: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();

    /**
     * open collapsible by default
     * if one of child element is active
     */
    const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

    return (
        <DropdownMenu>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button variant={isChildActive ? 'secondary' : 'ghost'} size="icon" className="h-12 w-12">
                            {icon}
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                    {title} {label && <span className="ml-auto text-muted-foreground">{label}</span>}
                    <IconChevronDown size={18} className="-rotate-90 text-muted-foreground" />
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent side="right" align="start" sideOffset={4}>
                <DropdownMenuLabel>
                    {title} {label ? `(${label})` : ''}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sub!.map(({ title, icon, label, href }) => (
                    <DropdownMenuItem key={`${title}-${href}`} asChild>
                        <Link href={href} className={`${checkActiveNav(href) ? 'bg-secondary' : ''}`}>
                            {icon} <span className="ml-2 max-w-52 text-wrap">{title}</span>
                            {label && <span className="ml-auto text-xs">{label}</span>}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const Nav = ({ links, isCollapsed, className, closeNav }: NavProps) => {
    const renderLink = ({ sub, ...rest }: SideLink) => {
        const key = `${rest.title}-${rest.href}`;
        if (isCollapsed && sub) {
            return <NavLinkIconDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />;
        }
        if (isCollapsed) return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

        if (sub) return <NavLinkDropdown {...rest} key={key} closeNav={closeNav} />;

        return <NavLink {...rest} key={key} closeNav={closeNav} />;
    };

    return (
        <div
            data-collapsed={isCollapsed}
            className={cn(
                'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
                className
            )}
        >
            <TooltipProvider delayDuration={0}>
                <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                    {links.map(renderLink)}
                </nav>
            </TooltipProvider>
        </div>
    );
};
