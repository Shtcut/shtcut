'use client';

import { Skeleton } from '@shtcut-ui/react';
import { FC } from 'react';

interface SkeletonProps {
    width?: string | number;
    imageHeight?: string | number;
    margin?: string | number;
}

export const LinkPreviewSkeleton: FC<SkeletonProps> = ({ width = '100%', imageHeight = '30vh', margin }) => {
    return (
        <div className="skeleton-container" style={{ width, margin }}>
            <Skeleton className={`w-[${width}] h-[${imageHeight}]`} />
            <div className="skeleton-lower-container">
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        </div>
    );
};
