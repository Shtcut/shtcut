'use client';

import { Dict } from '@shtcut-ui/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Logo } from '../logo';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';

type FooterProps = {
    navs?: Dict[];
};

export const Footer = (props: FooterProps) => {
    const iconLink = [
        {
            name: 'Facebook',
            href: '#',
            icon: <FaFacebookF />
        },
        {
            name: 'Twitter',
            href: '#',
            icon: <FaTwitter />
        },
        {
            name: 'Facebook',
            href: '#',
            icon: <AiFillInstagram />
        },
        {
            name: 'Facebook',
            href: '#',
            icon: <FaLinkedinIn />
        },
        {
            name: 'Facebook',
            href: '#',
            icon: <FaYoutube />
        }
    ];
    const navigation = {
        product: [
            { name: 'Shortener', href: '#' },
            { name: 'Social', href: '#' },
            { name: 'Survey', href: '#' },
            { name: 'Email Marketing', href: '#' },
            { name: 'Roadmap', href: 'https://github.com/Shtcut/shtcut/issues' }
        ],
        company: [
            { name: 'About', href: '/' },
            { name: 'Contact us', href: '/' },
            { name: 'Careers', href: '/' },
            { name: 'Culture', href: '/' },
            { name: 'Blog', href: '/' }
        ],
        support: [
            { name: 'Getting started', href: '/' },
            { name: 'Help center', href: '/' },
            { name: 'Server status', href: '/' },
            { name: 'Report a bug', href: '/' },
            { name: 'Chat support', href: '/' }
        ],
        contact: [
            { name: 'contact@company.com', href: '/', icon: <Mail size={16} /> },
            { name: '(414) 687 - 5892', href: '/', icon: <Phone size={16} /> },
            { name: '794 Mcallister StSan Francisco, 94102', href: '/', icon: <MapPin size={16} /> }
        ]
    };

    return (
        <footer className="w-full bg-primary-400 text-white">
            <div className="max-w-screen-xl border-b- mx-auto flex justify-between  lg:flex-row flex-col items-center lg:items-start  px-4 py-16 ">
                <div>
                    <div className="w-full ">
                        <div className="flex flex-col text-[#E3E3E3] gap-y-3 gap-x-2 items-center lg:items-start">
                            <Logo />
                            <p className="max-w-xs text-sm text-shade-pencil-light text-center lg:text-start">
                                The open-source software functions as a marketing tool, Empowering Marketing Innovation,
                                Together
                            </p>
                        </div>
                        <div className="flex mt-4 justify-center lg:justify-start items-center space-x-4">
                            {iconLink.map((icons, index) => (
                                <Link
                                    key={index}
                                    href={icons.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-md transition-colors hover:bg-gray-100 active:bg-gray-200"
                                >
                                    <span className="sr-only">{icons.name}</span>
                                    <div>{icons.icon}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-4 lg:mt-0">
                    <div className=" flex flex-col gap-y-2">
                        <h3 className="text-lg  text-center lg:text-start  font-semibold mb-3">Product</h3>
                        {navigation.product.map((item) => (
                            <Link
                                href={item.href}
                                key={`footer-product-${item.name}`}
                                className="text-sm text-center lg:text-start  text-shade-pencil-light hover:text-shade-pencil-black text-[#E3E3E3] "
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-4 lg:mt-0">
                    <div className=" flex flex-col gap-y-2">
                        <h3 className="text-lg text-center lg:text-start   font-semibold mb-3">Company</h3>
                        {navigation.company.map((item) => (
                            <Link
                                href={item.href}
                                key={`footer-company-${item.name}`}
                                className="text-sm text-center lg:text-start  text-shade-pencil-light hover:text-shade-pencil-black text-[#E3E3E3]"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-4 lg:mt-0">
                    <div className=" flex flex-col gap-y-2 ">
                        <h3 className="text-lg text-center lg:text-start  font-semibold mb-3">Support</h3>
                        {navigation.support.map((item) => (
                            <Link
                                href={item.href}
                                key={`footer-legal-${item.href}`}
                                className="text-sm text-shade-pencil-light hover:text-shade-pencil-black text-center lg:text-start  text-[#E3E3E3]"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-4 lg:mt-0">
                    <div className=" flex flex-col gap-y-2 ">
                        <h3 className="text-lg text-center lg:text-start font-semibold  lg:mb-3">Contact</h3>
                        {navigation.contact.map((item) => (
                            <Link
                                href={item.href}
                                key={`footer-legal-${item.href}`}
                                className="text-sm text-shade-pencil-light hover:text-shade-pencil-black flex items-center justify-center lg:justify-start gap-x-2 text-[#E3E3E3]"
                            >
                                <span className="">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <section className="max-w-screen-xl mx-auto flex border-t justify-between  sm:flex-row flex-col items-center px-4 py-3">
                <div className="flex items-center space-x-2">
                    <Link
                        href="https://github.com/Shtcut/shtcut"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md p-1 transition-colors hover:bg-gray-100 active:bg-gray-200"
                    >
                        <span className="sr-only ">Github</span>
                        <FaGithub className="h-5 w-5 text-shade-pencil-light" />
                    </Link>
                    <p className="text-sm leading-5 text-shade-disabled">
                        © {new Date().getFullYear()} TechZebra Inc.
                    </p>
                </div>
                <div className="cursor-pointer py-3 sm:py-0 text-center sm:text-start text-sm">
                    All Rights Reserved | <span className="underline">Terms and Conditions</span> |{' '}
                    <span className="underline">Privacy Policy</span>
                </div>
            </section>
        </footer>
    );
};
