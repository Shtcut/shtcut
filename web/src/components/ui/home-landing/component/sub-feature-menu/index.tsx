'use client';

import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent
} from '@shtcut-ui/react';
import Link from 'next/link';

const FeatureMenu = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="transition-colors hover:text-foreground text-sm font-medium text-muted-foreground ">
                        Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className=" p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <Link href={'/url-shorten-er'} className="text-sm underline">
                                URL Shorten-er
                            </Link>
                        </div>
                        <div className=" p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <Link href={'/pricing'} className="text-sm underline">
                                Pricing{' '}
                            </Link>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default FeatureMenu;
