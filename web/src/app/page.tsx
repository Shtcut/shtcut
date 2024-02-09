/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { Button } from '@shtcut-ui/react';

import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const [state, setState] = useState(false);
    const navigation = [
        { title: 'Home', path: 'javascript:void(0)' },
        { title: 'Domains', path: 'javascript:void(0)' },
        { title: 'Pricing', path: 'javascript:void(0)' },
        { title: 'Developers', path: 'javascript:void(0)' },
        { title: 'FAQs', path: 'javascript:void(0)' }
    ];
    const Logo = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <a>
                <Image src="/logo.svg" width={120} height={50} alt="Shtcut Logo" />
            </a>
            <div className="md:hidden">
                <Button className="menu-btn text-gray-500 hover:text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    );
    return (
        <main className="flex min-h-screen flex-col">
            <div className="relative">
                <div
                    className="absolute inset-0 blur-xl h-[580px]"
                    style={{
                        background:
                            'linear-gradient(130.6deg, rgba(47, 88, 233, 1) , rgba(47, 155, 233, 0.4) 0%, rgba(204, 171, 238, 0) 50.35%)'
                    }}
                />
                <div className="relative">
                    <header>
                        <div className={`md:hidden ${state ? 'mx-2 pb-5' : 'hidden'}`}>
                            <Logo />
                        </div>
                        <nav
                            className={`pb-5 md:text-sm ${
                                state
                                    ? 'absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent'
                                    : ''
                            }`}
                        >
                            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                                <Logo />
                                <div
                                    className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                                        state ? 'block' : 'hidden'
                                    } `}
                                >
                                    <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                        {navigation.map((item, idx) => {
                                            return (
                                                <li key={idx} className="text-gray-700 hover:text-gray-900">
                                                    <a href={item.path} className="block">
                                                        {item.title}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="items-center justify-end mt-6 space-y-6 md:flex md:mt-0">
                                        <a
                                            href="javascript:void(0)"
                                            className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                                        >
                                            Sign in
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <section>
                        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
                            <div className="flex-none space-y-5 max-w-xl">
                                <a
                                    href="javascript:void(0)"
                                    className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white"
                                >
                                    <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
                                        News
                                    </span>
                                    <p className="flex items-center">
                                        Read the launch post from here
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </p>
                                </a>
                                <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                                    Generate short URLs with just a click
                                </h1>
                                <p>
                                    Paste in any long url, make it sharable, trackable and customizable with just a few
                                    clicks.
                                </p>
                                <div className="flex items-center gap-x-3 sm:text-sm">
                                    <a
                                        href="javascript:void(0)"
                                        className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                                    >
                                        Get started
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex-1 hidden md:block">
                                <div className="inline-block relative">
                                    <img src="/link.svg" className="" alt="chain image" />
                                    <img src="/link-1.svg" className="absolute top-0 left-0" alt="chain image" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
