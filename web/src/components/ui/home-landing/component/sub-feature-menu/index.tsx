'use client';

import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
    useToast
} from '@shtcut-ui/react';
import Link from 'next/link';
import { ListItem } from '@shtcut/components/_shared/ListItem';

import { IoQrCodeOutline } from 'react-icons/io5';
import { PiUsersThreeLight } from 'react-icons/pi';
import { PiUserListLight } from 'react-icons/pi';
import { PiChartLineUp } from 'react-icons/pi';
import { GoLink } from 'react-icons/go';
import { BiTask } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';
import { BsCodeSlash } from 'react-icons/bs';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { BsBuildings } from 'react-icons/bs';
import { FaRegNewspaper } from 'react-icons/fa';

type IProps = {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};

const FeatureMenu = ({ onMouseEnter, onMouseLeave }: IProps) => {
    const { toast } = useToast();
    const showToast = () => {
        toast({
            title: 'Coming Soon',
            description: 'This feature is coming soon!',
            variant: 'default'
        });
    };
    const features: { title: string; href: string; description: string; icon?: any }[] = [
        {
            title: 'Link Management',
            href: '#',
            description: 'Generate short URLs with just a click, metrics and track performance',
            icon: GoLink
        },
        {
            title: 'QR Code',
            href: '#',
            description: 'Collaborate with team members, performance metrics and schedule',
            icon: IoQrCodeOutline
        },
        {
            title: 'Progress',
            href: '#',
            description: 'Discover trends and insights about your brand and competitors and offer ',
            icon: PiUsersThreeLight
        },
        {
            title: 'Hover Card',
            href: '#',
            description: 'Discover trends and insights about your brand and competitors and offer ',
            icon: PiUserListLight
        },
        {
            title: 'Progress',
            href: '#',
            description: 'Discover trends and insights about your brand and competitors and offer ',
            icon: PiChartLineUp
        }
    ];
    const product: { title: string; href: string; description: string; icon?: any; img?: string }[] = [
        {
            title: 'URL Shortner',
            href: '/product/url-shortener',
            description:
                'Generate short URLs with just a click, streamline your link strategy with links manager, get performance metrics and track performance',
            icon: GoLink
        },
        {
            title: 'Survey Creation',
            href: '/product/survey-creation',
            description: 'Collaborate with team members, performance metrics and schedule surveys.',
            icon: BiTask
        },
        {
            title: 'Email Marketing',
            href: '/product/email-marketing',
            description:
                'Discover trends and insights about your brand and competitors and offer more automation features.',
            icon: MdEmail
        },
        {
            title: 'Social Media Management',
            href: '/product/social-media',
            description:
                'Discover trends and insights about your brand and competitors and offer more automation features.',
            img: '/images/social-icon.png'
        }
    ];
    const solutions: { title: string; href: string; description: string; icon?: any; img?: string }[] = [
        {
            title: 'Developers',
            href: '#',
            description: 'Generate short URLs with just a click, metrics and track performance',
            icon: BsCodeSlash
        },
        {
            title: 'Cooperate',
            href: '#',
            description: 'Collaborate with team members, performance metrics and schedule',
            // icon: IoIosHelpCircleOutline
            icon: BsBuildings
        }
    ];
    const resources: { title: string; href: string; description: string; icon?: any; img?: string }[] = [
        {
            title: 'Blog',
            href: '/blog',
            description: 'Generate short URLs with just a click, metrics and track performance',
            icon: FaRegNewspaper
        },
        {
            title: 'Help Center',
            href: '#',
            description: 'Collaborate with team members, performance metrics and schedule',
            icon: IoIosHelpCircleOutline
        }
    ];

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className="">
                        <NavigationMenuTrigger
                            className="text-sm font-normal bg-transparent"
                            onMouseLeave={onMouseLeave}
                            onMouseEnter={onMouseEnter}
                        >
                            Product
                        </NavigationMenuTrigger>
                        <NavigationMenuContent
                            onMouseLeave={onMouseLeave}
                            onMouseEnter={onMouseEnter}
                            className="rounded-[20px]"
                        >
                            <div className=" flex w-[400px] gap-3 p-6 md:w-[500px]  lg:w-[600px]">
                                <div className="w-1/2">
                                    <h1 className="font-semibold text-xs uppercase px-3">Features</h1>
                                    <ul className="mt-2  ">
                                        {features.map((component, index) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                                icon={
                                                    component.icon ? (
                                                        <component.icon
                                                            className={`${index === 0 || index === 1 ? 'w-4 h-4' : 'w-5 h-5'} text-[#424242]`}
                                                        />
                                                    ) : null
                                                }
                                                className="text-[#777777] text-xs"
                                                onClick={showToast}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-1/2">
                                    <h1 className="font-semibold text-xs uppercase px-3">Our Products</h1>
                                    <ul className="mt-2 ">
                                        {product.map((component, index) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                                icon={
                                                    component.icon || component.img ? (
                                                        component.img ? (
                                                            <Image
                                                                src={component.img}
                                                                width={20}
                                                                height={20}
                                                                alt={component.title}
                                                            />
                                                        ) : (
                                                            <component.icon
                                                                className={`${index === 0 ? 'w-4 h-4' : 'w-[18px] h-[18px]'}  text-[#424242]`}
                                                            />
                                                        )
                                                    ) : null
                                                }
                                                className="text-xs text-[#777777]"
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="text-sm font-normal bg-transparent"
                            onMouseLeave={onMouseLeave}
                            onMouseEnter={onMouseEnter}
                        >
                            Solutions
                        </NavigationMenuTrigger>
                        <NavigationMenuContent onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
                            <div className="p-6">
                                <h1 className="font-semibold text-xs uppercase px-3">Solutions</h1>
                                <ul className="grid w-[400px] gap-3 mt-4  md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {solutions.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                            icon={
                                                component.icon ? (
                                                    <component.icon className="w-4 h-4 text-[#424242]" />
                                                ) : null
                                            }
                                            className="text-xs text-[#777777]"
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="text-sm font-normal bg-transparent"
                            onMouseLeave={onMouseLeave}
                            onMouseEnter={onMouseEnter}
                        >
                            Resources
                        </NavigationMenuTrigger>
                        <NavigationMenuContent onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
                            <div className="p-6">
                                <h1 className="font-semibold text-xs uppercase px-3">Resources</h1>
                                <ul className="grid w-[400px] px-2 gap-3 mt-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {resources.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                            icon={
                                                component.icon ? (
                                                    <component.icon className="w-4 h-4 text-[#424242]" />
                                                ) : null
                                            }
                                            className="text-xs text-[#777777]"
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/pricing" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={`${navigationMenuTriggerStyle()} bg-transparent font-normal text-sm`}
                            >
                                Pricing
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
};

export default FeatureMenu;
