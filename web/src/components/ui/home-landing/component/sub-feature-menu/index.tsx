'use client';

import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent
} from '@shtcut-ui/react';
import RouteLink from '@shtcut/components/ui/nav-link/route-link';
import Image from 'next/image';
import { AnimatedList } from '@shtcut/components/_shared/animations/animated-list';
import { subNav } from '@shtcut/_shared/data';

const FeatureMenu = () => {
    const navData = [
        {
            route: true,
            link: '/about-us',
            title: 'About us'
        },
        {
            route: false,
            link: 'pricing',
            title: 'Pricing'
        },
        {
            route: true,
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
                        <NavigationMenuContent className="bg-gray-100/20">
                            <section className="w-60  flex flex-col ">
                                {subNav.map((nav) => (
                                    <AnimatedList>
                                        <RouteLink
                                            href={nav.link}
                                            className="hover:bg-slate-100 px-4 py-2 hover:border-none  gap-x-2 w-full flex items-center "
                                        >
                                            <div className="shadow w-12 border hover:border-none  border-gray-100 h-12 rounded flex justify-center items-center">
                                                <Image src={nav.images} width={24} height={24} alt="url-shorten" />
                                            </div>
                                            <p className="text-sm font-medium">{nav.text}</p>
                                        </RouteLink>
                                    </AnimatedList>
                                ))}
                            </section>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <section className="flex items-center gap-2 ">
                {navData.map((nav, index) => (
                    <RouteLink
                        key={index}
                        href={nav.link}
                        isDisabled={nav.route}
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
