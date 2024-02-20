'use client';

import { Button } from '@shtcut-ui/react';
import Image from 'next/image';

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

export default Logo;
