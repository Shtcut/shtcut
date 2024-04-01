'use client';

import { ApiResponse } from '@shtcut/_shared/namespace';
import React, { useEffect} from 'react';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}?=url`;
export const imagePlaceholder = 'https://i.imgur.com/UeDNBNQ.jpeg';


interface MetaData {
    title: string;
    url: string;
    description: string;
}

interface OpenGraphData {
    site_name: string;
    url: string;
    title: string;
    image: string;
    description: string;
}

interface LinkPreviewData {
    meta: MetaData;
    og: OpenGraphData;
    images: string[];
}

const isValidResponse = ({ data }: ApiResponse<LinkPreviewData>) => {
    if (!data) return false;
}

export interface LinkPreviewProps {
    url: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    descriptionLength?: number;
    borderRadius?: string | number;
}