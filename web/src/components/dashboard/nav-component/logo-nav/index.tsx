import { subNav } from '@shtcut/_shared/data';
import { AnimatedList } from '@shtcut/components/_shared/animations/animated-list';
import { Logo } from '@shtcut/components/ui';
import RouteLink from '@shtcut/components/ui/nav-link/route-link';
import Image from 'next/image';
import React from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@shtcut-ui/react';

const LogoNavBar = () => {
    return (
        <div className="flex items-center space-x-[156px]">
            <Logo />
            <div className="flex items-center space-x-[14px]">
                {subNav.map((nav) => (
                    <AnimatedList key={nav.id}>
                        <RouteLink href={nav.link} className="">
                            <Card className=" w-[51px]  h-[45px] rounded flex justify-center items-center  cursor-pointer shadow-sm border-gray-100 border">
                                <Image src={nav.images} width={24} height={24} alt="url-shorten" />
                            </Card>
                        </RouteLink>
                    </AnimatedList>
                ))}
                <Plus className="cursor-pointer" />
            </div>
        </div>
    );
};

export default LogoNavBar;
