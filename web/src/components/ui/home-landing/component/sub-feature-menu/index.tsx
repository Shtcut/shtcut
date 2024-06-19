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
import RouteLink from '@shtcut/components/ui/nav-link/route-link';

const FeatureMenu = () => {
    const navData = [
        {
            link: '/about-us',
            title: 'About us'
        },
        {
            link: 'pricing',
            title: 'Pricing'
        },
        {
            link: 'contact-us',
            title: 'Contact us'
        }
    ];
    return (
        <section className="flex items-center gap-2">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="transition-colors   hover:text-foreground text-sm  text-[#433E3F] ">
                            Our Products
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {/* <div className=" p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <RouteLink href={'/url-shorten-er'} isDisabled={true} className="text-sm underline">
                                URL Shorten-er
                            </RouteLink>
                        </div>
                        <div className=" p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <RouteLink isDisabled={true} href={'/pricing'} className="text-sm underline">
                                Pricing{' '}
                            </RouteLink>
                        </div> */}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <section className="flex items-center gap-2 ">
                {navData.map((nav, index) => (
                    <RouteLink
                        key={index}
                        href={nav.link}
                        isDisabled={true}
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  "
                    >
                        {nav.title}
                    </RouteLink>
                ))}
            </section>
        </section>
    );
};

export default FeatureMenu;
