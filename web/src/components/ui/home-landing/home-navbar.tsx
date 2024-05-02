'use client';

import Link from 'next/link';
import { Logo } from '../logo';
import { buttonVariants, cn } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks/auth';
import { isEmpty, isUndefined } from 'lodash';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuIcon from '@shtcut/asset/icons/MenuIcon';
import { Button, Drawer, DrawerContent, DrawerTrigger } from '@shtcut-ui/react';
import { FeatureMenu } from './component';
export const HomeNavbar = () => {
    const { authData } = useAuth();
    const workspace = authData?.workspaces[0]?.slug;
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className={`h-14 fixed left-0 right-0 z-50 bg-white ${isScrolled ? 'shadow' : ''}`}>
            <nav className="max-w-screen-xl mx-auto px-4   flex h-full items-center justify-between">
                <section className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="flex gap-2  font-handwriting text-xl lowercase [text-shadow:_0_2px_0_#e1e1e1] dark:[text-shadow:none]"
                    >
                        <Logo />
                    </Link>

                    <div className="hidden space-x-4 md:flex items-center  ">
                        <FeatureMenu />
                        <Link
                            href="/pricing"
                            className="transition-colors hover:text-foreground text-sm font-medium text-muted-foreground "
                        >
                            Pricing
                        </Link>
                    </div>
                </section>
                <section>
                    <section className="md:hidden flex">
                        <Drawer>
                            <DrawerTrigger>
                                <MenuIcon />
                            </DrawerTrigger>
                            <DrawerContent style={{ width: '100%', height: '100%' }}>Navabr</DrawerContent>
                        </Drawer>
                    </section>

                    <div className="hidden md:flex flex-1  justify-end gap-2">
                        {!isEmpty(authData) && !isUndefined(authData) ? (
                            <>
                                <Link
                                    href={`/url/${workspace}/overview`}
                                    className={cn(
                                        buttonVariants(),
                                        'bg-blue-600 h-8 rounded-full px-3 font-semibold transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                                    )}
                                >
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <section className="md:flex hidden items-center gap-4">
                                    <Link
                                        href="/auth/sign-in"
                                        className={cn(
                                            buttonVariants({ variant: 'outline' }),
                                            ' h-8 rounded-full px-5 font-semibold transition-all duration-200 hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background sm:inline-flex'
                                        )}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/auth/sign-up"
                                        className={cn(
                                            buttonVariants(),
                                            'bg-blue-600 h-8 rounded-full px-3 font-semibold transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                                        )}
                                    >
                                        Sign Up
                                    </Link>
                                </section>
                            </>
                        )}
                    </div>
                </section>
            </nav>
        </header>
    );
};
