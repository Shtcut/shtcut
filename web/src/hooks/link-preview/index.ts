/* eslint-disable react-hooks/exhaustive-deps */
import { isValidURL } from '@shtcut/_shared';
import { ApiResponse } from '@shtcut/_shared/namespace';
import { LinkPreviewNamespace } from '@shtcut/_shared/namespace/link-preview';
import { useEffect, useRef, useState } from 'react';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
const apiKey = `${process.env.NEXT_PUBLIC_API_KEY}`;

interface UseLinkPreviewProps {
    url: string;
    fetcher?: (url: string) => Promise<ApiResponse<LinkPreviewNamespace.LinkPreviewData> | null>;
    onSuccess?: (res: ApiResponse<LinkPreviewNamespace.LinkPreviewData> | null) => void;
}

export const useLinkPreview = (props: UseLinkPreviewProps) => {
    const { url, onSuccess } = props;

    const _isMounted = useRef(true);
    const [metadata, setMetadata] = useState<ApiResponse<LinkPreviewNamespace.LinkPreviewData> | null>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        _isMounted.current = true;

        if (url && isValidURL(url)) {
            setLoading(false);
            fetch(`${baseUrl}/shtner/links/metadata?url=${url}&apiKey=${apiKey}`)
                .then((res) => res.json())
                .then((res) => {
                    if (_isMounted.current) {
                        setMetadata(res);
                        onSuccess?.(res);
                        setLoading(false);
                    }
                })
                .catch(() => {
                    console.error('No metadata could be found for this URL.');
                    if (_isMounted.current) {
                        onSuccess?.(null);
                        setMetadata(null);
                        setLoading(false);
                    }
                });
        }
        return () => {
            _isMounted.current = false;
        };
    }, [url]);

    return { metadata, loading };
};
