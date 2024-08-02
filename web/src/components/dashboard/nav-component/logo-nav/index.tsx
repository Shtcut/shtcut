import Image from 'next/image';
import React from 'react';
import { ChevronRight } from 'lucide-react';

const LogoNavBar = () => {
    return (
        <div className="flex items-center space-x-[156px]">
            <div className="flex items-center gap-x-8">
                <Image src={'/images/shtcut-logo-icon.png'} width={24} height={24} alt="shtcut logo" />
                <h1 className="font-semibold text-sm">Link Shortener</h1>
            </div>
            <div className="flex items-center gap-x-2">
                <p className="text-xs text-[#898384]">Link Shortener</p>
                <ChevronRight size={16} />
                <p className="text-primary-0 text-xs">Links</p>
            </div>
        </div>
    );
};

export default LogoNavBar;
