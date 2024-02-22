'use client';

import { Button } from '@shtcut-ui/react';
import Image from 'next/image';

type LogoProps = {
    className?: string;
    width?: number;
    height?: number;
};

export const Logo = (props: LogoProps) => (
    <div className="flex items-center justify-between py-5 md:block">
        <Image
            src="/logo.svg"
            width={props.width ?? 120}
            height={props.height ?? 50}
            alt="Shtcut Logo"
            className={props.className}
        />
    </div>
);
