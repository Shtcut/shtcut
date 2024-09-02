'use client';

import { Skeleton } from '@shtcut-ui/react';
import { FC } from 'react';

interface SkeletonProps {
    width?: string | number;
    imageHeight?: string | number;
    margin?: string | number;
}

export const LinkPreviewSkeleton: FC<SkeletonProps> = ({  }) => {
    return (
        <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </>
    );
};
