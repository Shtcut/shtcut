'use client';

import React, { FC } from 'react';
import { imagePlaceholder } from '@shtcut/_shared/constant';
import { ApiResponse } from '@shtcut/_shared/namespace';
import { LinkPreviewNamespace } from '@shtcut/_shared/namespace/link-preview';
import { useLinkPreview } from '@shtcut/hooks/link-preview';
import LinkSkeleton from '../LinkSkeleton';
import { isEmpty } from 'lodash';
import { isValidURL } from '@shtcut/_shared';

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
        showLoader = false,
        customLoader = null,
        fetcher,
        fallbackImageSrc = imagePlaceholder,
        explicitImageSrc = null,
        showPlaceholderIfNoImage = true,
        showLockedImage = false,
        onSuccess
    } = props;

    const { metadata, loading } = useLinkPreview({ onSuccess, url, fetcher });

    if (loading && showLoader) {
        if (customLoader) {
            return <>{customLoader}</>;
        } else {
            return <LinkSkeleton />;
        }
    }

    if (isEmpty(url)) {
        <>
            <div
                style={{
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    backgroundImage: `url(${fallbackImageSrc}), url(${fallbackImageSrc})`,
                    height: imageHeight
                }}
                className="image"
            />
        </>;
    }

    if (!metadata || !metadata.data) {
        return (
            <>
                {fallback ? (
                    fallback
                ) : (
                    <>
                        <div
                            style={{
                                borderTopLeftRadius: borderRadius,
                                borderTopRightRadius: borderRadius,
                                backgroundImage: `url(${fallbackImageSrc}), url(${fallbackImageSrc})`,
                                height: imageHeight
                            }}
                            className="image"
                        />
                    </>
                )}
            </>
        );
    }

    const {
        meta: { title, description },
        og: { title: urlTitle, description: urlDescription, image }
    } = metadata.data ? (metadata?.data as LinkPreviewNamespace.LinkPreviewData) : ({} as any);

    return (
        <div
            className={`container ${className}`}
            style={{ width, height, borderRadius, textAlign, margin, backgroundColor, borderColor }}
        >
            {url && isValidURL(url) ? (
                <>
                    {(image || fallbackImageSrc || showLockedImage) && showPlaceholderIfNoImage && (
                        <div
                            style={{
                                borderTopLeftRadius: borderRadius,
                                borderTopRightRadius: borderRadius,
                                backgroundImage: `url(${
                                    showLockedImage
                                        ? '/chain-and-locked-padlock.svg'
                                        : explicitImageSrc || image || fallbackImageSrc
                                }), url(${fallbackImageSrc})`,
                                height: imageHeight
                            }}
                            className="image"
                        />
                    )}
                </>
            ) : (
                <div
                    style={{
                        borderTopLeftRadius: borderRadius,
                        borderTopRightRadius: borderRadius,
                        backgroundImage: `url(${fallbackImageSrc}), url(${fallbackImageSrc})`,
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
