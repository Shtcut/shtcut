'use client';

import { Dict } from '@shtcut-ui/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

type FooterProps = {
    navs?: Dict[];
};

export const Footer = (props: FooterProps) => {
    const navigation = {
        product: [
            { name: 'Shortener', href: '#' },
            { name: 'Social', href: '#' },
            { name: 'Survey', href: '#' },
            { name: 'Email Marketing', href: '#' },
            { name: 'Roadmap', href: 'https://github.com/Shtcut/shtcut/issues' }
        ],
        company: [
            { name: 'Blog', href: '/' },
            { name: 'Security', href: '/' }
        ],
        legal: [
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' },
            { name: 'Cookies', href: '/cookies' }
        ]
    };

    return (
        <footer className="z-10 flex w-full items-center justify-center border-t border-shade-line bg-white/50">
            <div className="flex max-w-screen-xl flex-1 flex-col gap-y-4 px-4 py-8 xl:flex xl:flex-row xl:justify-between xl:gap-y-0">
                <div className="w-full space-y-4 xl:flex xl:w-1/2 xl:flex-col">
                    <div className="flex items-center gap-x-2">
                        <p className="max-w-xs text-sm text-shade-pencil-light">
                            The open-source software functions as a marketing tool, Empowering Marketing Innovation,
                            Together
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href="https://github.com/Shtcut/shtcut"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md p-1 transition-colors hover:bg-gray-100 active:bg-gray-200"
                        >
                            <span className="sr-only">Github</span>
                            <FaGithub className="h-5 w-5 text-shade-pencil-light" />
                        </Link>
                        <p className="text-sm leading-5 text-shade-disabled">
                            © {new Date().getFullYear()} TechZebra Inc.
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 justify-between">
                    <div className="my-2 flex flex-col gap-y-2">
                        <h3 className="text-sm font-semibold">Product</h3>
                        {navigation.product.map((item) => (
                            <Link
                                href={item.href}
                                key={`footer-product-${item.name}`}
                                className="text-sm text-shade-pencil-light hover:text-shade-pencil-black"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="my-2 flex flex-col gap-y-2">
                        <h3 className="text-sm font-semibold">Company</h3>
                        {navigation.company.map((item) => (
                            <Link
                                href={item.href}
                                key={`footer-company-${item.name}`}
                                className="text-sm text-shade-pencil-light hover:text-shade-pencil-black"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="my-2 flex flex-col gap-y-2">
                        <h3 className="text-sm font-semibold">Legal</h3>
                        {navigation.legal.map((item) => (
                            <Link
                                href={item.href}
                                key={`footer-legal-${item.href}`}
                                className="text-sm text-shade-pencil-light hover:text-shade-pencil-black"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
