'use client';

import { Logo } from '../logo';
import { useAuth } from '@shtcut/hooks/auth';
import { isUndefined } from 'lodash';
import MenuIcon from '@shtcut/asset/icons/MenuIcon';
import { FeatureMenu } from './component';
import RouteLink from '../nav-link/route-link';

import { routes } from '@shtcut/_shared/utils/route';
import usePricingNavigation from '@shtcut/hooks/usePricing-naviagtion';
import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import RightNavComponent from './right-nav';

export const HomeNavbar = () => {
    const { width } = useWindowSize();
    const mobile = width !== undefined && width <= 768;

    const { scrollToPricing } = usePricingNavigation();
    const { authData } = useAuth();
    const workspace = authData?.workspaces?.[0]?.slug;

    return (
        <header className=" ">
            <nav className="fixed left-0 right-0 transition-all inset-x-0   z-50 bg-white/75 backdrop-blur-xl dark:bg-black/75">
                <section className="flex max-w-screen-custom mx-auto justify-between items-center   px-4">
                    <section className="flex items-center space-x-4">
                        <RouteLink
                            href="/"
                            className="flex gap-2 font-handwriting text-xl lowercase [text-shadow:_0_2px_0_#e1e1e1] dark:[text-shadow:none]"
                        >
                            <Logo />
                        </RouteLink>
                    </section>

                    <section className="flex items-center gap-x-10">
                        <section className={`${mobile ? 'flex' : 'hidden'} `}>
                            <MenuIcon />
                        </section>
                        <div className={` space-x-4 ${mobile ? 'hidden' : 'flex'}  items-center`}>
                            <FeatureMenu />
                        </div>
                        <RightNavComponent
                            mobile={mobile}
                            routes={routes}
                            workspace={workspace}
                            authData={authData}
                            isUndefined={isUndefined}
                            scrollToPricing={scrollToPricing}
                        />
                    </section>
                </section>
            </nav>
        </header>
    );
};
