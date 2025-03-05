import { ApiResponse } from '@shtcut/_shared/namespace';
import { UsePaginationActions, UsePaginationState } from '../pagination';
import { EyeRadiusType } from '../types';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { LinkParams } from '@shtcut/hooks/link';
import { MetaData } from '../tags';

// Common QR Code Data Interface
interface CommonQrCodeData {
    qrCode: {
        colors: {
            presetColor: string;
            borderColor: string;
            background: string;
        };
    };
    frame: string | null;
    qrStyle: string | null;
    eyeRadius: EyeRadiusType;
    logo: string | null;
    name: string | null;
}

// Payload for "website"
interface WebsitePayload extends CommonQrCodeData {
    type: 'website';
    bgColor: string;
    url: string;
}

// Payload for "multi-link"
interface MultiLinkPayload extends CommonQrCodeData {
    type: 'multi-link';
    title: string;
    description: string;
    profileImage: string;
    links: { url: string; title: string }[];
    bgColor: string;
    socialMedia: Record<string, string>;
    template: {
        template: string;
        presetColor: string;
        btnColor: string;
    };
}

// Payload for "vcard"
interface VcardPayload extends CommonQrCodeData {
    type: 'vCard';
    title: string;
    description: string;
    profileImage: string;
    contacts: {
        phone: string;
        email: string;
        website: string;
    };
    address: {
        street: string;
        country: string;
        city: string;
        zipCode: string;
        state: string;
    };
    company: string | null;
    socialMedia: { platform: string; link: string }[];
    bgColor: string;
    template: {
        template: string;
        presetColor: string;
        btnColor: string;
    };
}

// Payload for "pdf"
interface PdfPayload extends CommonQrCodeData {
    type: 'pdf';
    title: string;
    description: string;
    profileImage: string;
    file: { name: string; size: number; type: string };
    bgColor: string;
}

// Union Type for Payload
export type QrCodePayload = WebsitePayload | MultiLinkPayload | VcardPayload | PdfPayload;

export interface QrCodeLinkActions {
    createqrCode: (payload: QrCodePayload) => Promise<any>;
    updateQrCode: MutationTrigger<any>;
    setLoadingState: (key: 'creating' | 'deleting' | 'updating', value: boolean) => void;
    paginationActions: UsePaginationActions;
    deleteQrCodeLink: MutationTrigger<any>;
    findAllQrCode: any;
    deleteBulkQrCodes: any;
}

export interface QrCodeLinkState {
    isLoadingState: boolean;
    createQrCodeResponse: any;
    updateQrCodeResponse: any;
    findAllQrCodeResponse: ApiResponse<QRCodeDataResponse[]> | undefined;
    isLoading: boolean;
    pagination: UsePaginationState;
    deleteLinkResponse: Dict;
    getSingleQrCode: QRCodeDataResponse | undefined;
    params: LinkParams;
    getQrCodeIsLoading: boolean;
    isLoadingBulk: boolean;
}

type QRCodeType = 'multi-link' | 'website' | 'vcard' | 'pdf';
export interface QRCodeDataResponseApi extends MetaData {
    data: QRCodeDataResponse[];
}
export interface QRCodeDataResponse {
    id: string;
    publicId: string;
    slug: string;
    title: string;
    type: QRCodeType;
    name: string;
    bgColor: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    active: boolean;
    enableTracking: boolean;
    isSlugAvailable: boolean;
    scanned: boolean;
    totalScanned: number;
    qrCode: {
        colors: {
            presetColor: string;
            borderColor: string;
            background: string;
        };

        frame: number | null;
        qrStyle: 'squares' | 'dots' | 'fluid' | undefined;
        eyeRadius: EyeRadiusType;
        logo: string | null;
        name: string | null;
    };
    logo?: string;
    template?: {
        template: string;
        presetColor: string;
        btnColor: string;
    };
    socialMedia?: Record<string, string>;
    url?: string;
    __v: number;
    [key: string]: any;
}
