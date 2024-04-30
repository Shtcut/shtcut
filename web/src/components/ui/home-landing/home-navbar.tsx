'use client';

import Link from 'next/link';
import { Logo } from '../logo';
import { buttonVariants, cn } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks/auth';
import { isEmpty, isUndefined } from 'lodash';
import { useParams } from 'next/navigation';

export const HomeNavbar = () => {
    const { authData } = useAuth();
    const workspace = authData?.workspaces[0]?.slug;

    return (
        <header className=" h-14 fixed  left-0 right-0 bg-white">
            <nav className="container flex h-full items-center justify-between">
                <Link
                    href="/"
                    className="flex gap-2 px-4 font-handwriting text-xl lowercase [text-shadow:_0_2px_0_#e1e1e1] dark:[text-shadow:none]"
                >
                    <Logo />
                </Link>

                <div className="hidden space-x-4 px-5 text-sm font-medium text-muted-foreground md:inline-block">
                    <Link href="/#features" className="transition-colors hover:text-foreground">
                        Features
                    </Link>
                    <Link href="/pricing" className="transition-colors hover:text-foreground">
                        Pricing
                    </Link>
                </div>

                <div className="flex flex-1 justify-end gap-2">
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
                            <Link
                                href="/auth/sign-in"
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'hidden h-8 rounded-full px-5 font-semibold transition-all duration-200 hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background sm:inline-flex'
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
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
