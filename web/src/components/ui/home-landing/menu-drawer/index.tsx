import { Drawer, DrawerContent } from '@shtcut-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import RouteLink from '../../nav-link/route-link';
import { Logo } from '../../logo';
import { X } from 'lucide-react';
import { FeatureMenu } from '../component';

const MenuDrawer = ({
    isOpen,
    setIsDrawerOpen,
    handleMouseLeave,
    handleMouseEnter
}: {
    isOpen: boolean;
    handleMouseLeave: () => void;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
    handleMouseEnter: () => void;
}) => {
    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsDrawerOpen} direction="bottom">
                <DrawerContent className={`h-full  block right-0  p-4 rounded-none `}>
                    <section>
                        <div className="flex items-center justify-between">
                            <RouteLink
                                href="/"
                                className="flex gap-2 font-handwriting text-xl lowercase [text-shadow:_0_2px_0_#e1e1e1] dark:[text-shadow:none]"
                            >
                                <Logo />
                            </RouteLink>
                            <X onClick={() => setIsDrawerOpen(false)} />
                        </div>
                        <FeatureMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    </section>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default MenuDrawer;
