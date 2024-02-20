'use client';

import { useState } from 'react';
import Logo from '../logo';

const NavBar = () => {
    const [state, setState] = useState(false);
    const navigation = [
        { title: 'Home', path: 'javascript:void(0)' },
        { title: 'Developers', path: 'javascript:void(0)' },
        { title: 'FAQs', path: '#faqs' }
    ];
    return (
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
                    <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
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
    );
};

export default NavBar;
