/** @format */
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@shtcut-ui/react';
import { generateBlurDataURL } from '@shtcut/_shared';
import Skeleton from '../skeleton-placeholder-img';

interface BlurImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    containerClassName?: string;
    fill?: boolean;
    priority?: boolean;
    unoptimized?: boolean;
    skeletonHeight?: string;
}

export const ImageComponent = ({
    src,
    alt,
    width,
    height,
    className = '',
    containerClassName = '',
    fill = false,
    priority = false,
    unoptimized = false,
    skeletonHeight
}: BlurImageProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn('relative overflow-hidden', containerClassName)}>
            {isLoading && (
                <div className="absolute h-full inset-0">
                    <Skeleton className="h-full w-full" height={skeletonHeight ? skeletonHeight : '500px'} />
                </div>
            )}

            <Image
                src={src}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                className={cn('transition-opacity duration-500', className, isLoading ? 'opacity-0' : 'opacity-100')}
                fill={fill}
                priority={priority}
                quality={100}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                placeholder="blur"
                blurDataURL={generateBlurDataURL(width || 600, height || 400)}
                unoptimized={unoptimized}
            />
        </div>
    );
};
