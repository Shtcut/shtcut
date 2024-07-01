import { subNav } from '@shtcut/_shared/data';
import { AnimatedList } from '@shtcut/components/_shared/animations/animated-list';
import { Logo } from '@shtcut/components/ui';
import RouteLink from '@shtcut/components/ui/nav-link/route-link';
import Image from 'next/image';
import React from 'react';
import { Plus } from 'lucide-react';

const LogoNavBar = () => {
    return (
        <div className="flex items-center space-x-[156px]">
            <Logo />
            <div className="flex items-center space-x-[14px]">
                {subNav.map((nav) => (
                    <AnimatedList key={nav.id}> 
                        <RouteLink href={nav.link} className="">
                            <div className="shadow w-[51px] border hover:border-none  border-gray-100 h-[45px] rounded flex justify-center items-center">
                                <Image src={nav.images} width={24} height={24} alt="url-shorten" />
                            </div>
                        </RouteLink>
                    </AnimatedList>
                ))}
                <Plus className="cursor-pointer" />
            </div>
        </div>
    );
};

export default LogoNavBar;
