import { Avatar, AvatarImage, AvatarFallback } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';

interface AvatarBadgeProps {
    image: string;
    badge: string;
    altText?: string;
    classNames?: string;
    size?: number;
}

const AvatarBadge = ({ image, badge, altText = 'Avatar', classNames, size = 48 }: AvatarBadgeProps) => {
    return (
        <div className={`relative`} style={{ width: size, height: size }}>
            <Avatar className="w-full h-full rounded-full">
                <AvatarImage src={image} alt={altText} />
                <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <Image
                src={badge}
                width={size * 0.45}
                height={size * 0.45}
                unoptimized
                priority
                alt="Badge"
                className="absolute bottom-0 right-0 rounded-full border-1 border-white"
            />
        </div>
    );
};

export default AvatarBadge;
