import { Dict } from '@shtcut-ui/react';
import { AppObject } from '../index';
import { UserNamespace } from '../user';

export namespace LinkNameSpace {
    export interface Link extends AppObject {
        utmParams?: {
            source?: string;
            medium?: string;
            campaign?: string;
            term?: string;
            content?: string;
        };
        devices?: {
            android?: string;
            ios?: string;
        };
        publicId: string;
        alias: string;
        target: string;
        user?: string | UserNamespace.LoggedInUser;
        workspace: string;
        domain: { slug: string };
        enableTracking?: string;
        title?: string;
        label?: [];
        geo?: Dict;
        proxy?: boolean;
        isPrivate?: boolean;
        clicks: number;
        archived?: boolean;
        qrCode?: string | Dict;
    }

    export interface LinkRequest extends ApiRequest {
        payload?: {
            _id?: string;
            id?: string;
            title?: string;
            target: string;
            workspace: string;
            domain: string;
            password?: string;
            enableTracking?: boolean;
            expiryDate?: string | Date;
            devices?: {
                android?: string;
                ios?: string;
            };
            geo?: Dict;
            utmParams?: {
                source?: string;
                medium?: string;
                campaign?: string;
                term?: string;
                content?: string;
            };
        };
    }
}
