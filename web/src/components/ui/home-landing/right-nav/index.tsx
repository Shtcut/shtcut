import { isEmpty } from 'lodash';
import React from 'react';
import RouteLink from '../../nav-link/route-link';
import { Button, buttonVariants, cn, Dict } from '@shtcut-ui/react';
import { RoutePaths } from '@shtcut/types/types';
type RightNavProps = {
    mobile: boolean;
    workspace: any;
    authData: Dict | null;
    routes: RoutePaths;
    scrollToPricing: () => void;
    isUndefined: any;
};

const RightNavComponent = ({ authData, mobile, isUndefined, workspace, routes, scrollToPricing }: RightNavProps) => {
    return (
        <div className={` ${mobile ? 'hidden' : 'flex'}  flex-1 justify-end gap-2`}>
            {!isEmpty(authData) && !isUndefined(authData) ? (
                <>
                    <RouteLink
                        href={`/url/${workspace}/overview`}
                        className={cn(
                            buttonVariants(),
                            'bg-blue-600 h-8 text-sm rounded-full px-3  transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                        )}
                    >
                        Dashboard
                    </RouteLink>
                </>
            ) : (
                <>
                    <section className="md:flex hidden items-center gap-4">
                        <RouteLink
                            href={routes.login}
                            className={cn(
                                buttonVariants({ variant: 'outline' }),
                                'h-8 rounded-[6px] w-16 text-sm border duration-200 shadow-none '
                            )}
                        >
                            Log In
                        </RouteLink>

                        <Button
                            onClick={scrollToPricing}
                            className={cn(
                                buttonVariants(),
                                'bg-primary-0 h-8 rounded-[6px] text-sm w-[72px] font-semibold transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                            )}
                        >
                            Sign up
                        </Button>
                    </section>
                </>
            )}
        </div>
    );
};

export default RightNavComponent;
