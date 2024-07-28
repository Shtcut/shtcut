import { cn, NavigationMenuLink } from '@shtcut-ui/react';
import React from 'react';

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
    title: string;
    icon?: React.ReactNode; // Define the icon prop
}

export const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, children, icon, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            'flex gap-x-3 select-none  rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ',
                            className
                        )}
                        {...props}
                    >
                        {icon && <div className="text-sm flex-shrink-0 hover:text-primary-0">{icon}</div>}

                        <div className="  ">
                            <div className="text-sm font-medium text-black leading-none mb-1">{title}</div>
                            <div className=" leading-snug">{children}</div>
                        </div>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);

ListItem.displayName = 'ListItem';
