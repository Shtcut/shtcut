'use client';

import React, { FC } from 'react';
import { imagePlaceholder } from '@shtcut/_shared/constant';
import { ApiResponse } from '@shtcut/_shared/namespace';
import { LinkPreviewNamespace } from '@shtcut/_shared/namespace/link-preview';
import { useLinkPreview } from '@shtcut/hooks/link-preview';
import { LinkPreviewSkeleton } from './skeleton';

export interface LinkPreviewProps {
    url: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    descriptionLength?: number;
    borderRadius?: string | number;
    imageHeight?: string | number;
    textAlign?: 'left' | 'right' | 'center';
    margin?: string | number;
    fallback?: JSX.Element[] | JSX.Element | null;
    backgroundColor?: string;
    primaryTextColor?: string;
    secondaryTextColor?: string;
    borderColor?: string;
    showLoader?: boolean;
    customLoader?: JSX.Element[] | JSX.Element | null;
    fetcher?: (url: string) => Promise<ApiResponse<LinkPreviewNamespace.LinkPreviewData> | null>;
    fallbackImageSrc?: string;
    explicitImageSrc?: string;
    showPlaceholderIfNoImage?: boolean;
    showLockedImage?: boolean;
    onSuccess?: (res: ApiResponse<LinkPreviewNamespace.LinkPreviewData> | null) => void;
}

export const LinkPreview: FC<LinkPreviewProps> = (props) => {
    const {
        url,
        className = '',
        width,
        height,
        descriptionLength,
        borderRadius,
        imageHeight,
        textAlign,
        margin,
        fallback,
        backgroundColor = 'white',
        primaryTextColor = 'black',
        secondaryTextColor = 'rgb(100, 100, 100)',
        borderColor = '#ccc',
        showLoader = true,
        customLoader = null,
        fetcher,
        fallbackImageSrc = imagePlaceholder,
        explicitImageSrc = null,
        showPlaceholderIfNoImage = true,
        showLockedImage = false,
        onSuccess = (res) => {}
    } = props;

    const { metadata, loading = true } = useLinkPreview({ onSuccess, url, fetcher });

    if (loading && showLoader) {
        if (customLoader) {
            return <>{customLoader}</>;
        } else {
            return <LinkPreviewSkeleton width={width} imageHeight={imageHeight} margin={margin} />;
        }
    }

    if (!metadata || !metadata.data) {
        return <>{fallback}</>;
    }

    const {
        meta: { title, description },
        og: { title: urlTitle, description: urlDescription, site_name: siteName, image }
    } = metadata?.data as LinkPreviewNamespace.LinkPreviewData;

    return (
        <div
            className={`container ${className}`}
            style={{ width, height, borderRadius, textAlign, margin, backgroundColor, borderColor }}
        >
            {(image || fallbackImageSrc || showLockedImage) && showPlaceholderIfNoImage && (
                <div
                    style={{
                        borderTopLeftRadius: borderRadius,
                        borderTopRightRadius: borderRadius,
                        backgroundImage: `url(${
                            explicitImageSrc || image || fallbackImageSrc || showLockedImage
                        }), url(${fallbackImageSrc})`,
                        height: imageHeight
                    }}
                    className="image"
                />
            )}
            <div className="lower-container">
                <h3 className="title" style={{ color: primaryTextColor }}>
                    {title || urlTitle}
                </h3>
                {(description || urlDescription) && (
                    <span className="description secondary" style={{ color: secondaryTextColor }}>
                        {descriptionLength
                            ? description.length > descriptionLength
                                ? description.slice(0, descriptionLength) + '...'
                                : description
                            : description}
                    </span>
                )}
            </div>
        </div>
    );
};
