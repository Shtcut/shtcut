import { Dict } from '@shtcut-ui/react';
import { AppObject, QueryArgs } from '../index';
import { UserNamespace } from '../user';
import { boolean } from 'yup';
import { PaginationType } from '@shtcut/types';
import { Pagination, UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';

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
        domain: { slug: string; name: string; _id: string };
        enableTracking?: boolean;
        title: string;
        tags: TagResponse[];
        label?: [];
        geo?: Dict;
        proxy?: boolean;
        isPrivate?: boolean;
        clicks: number;
        archived?: boolean;
        qrCode?: string | Dict;
        expiryDate?: string;
        metadata: {
            title: string;
            url: string;
            description: string;
            image: string;
            site_name: string;
            images: {
                src: string;
            }[];
        };
    }

    export interface LinkBioData {
        colors: {
            bgColor?: string;
            btnColor?: string;
            presetColor?: string;
        };
        description: string;
        links: LinkBioDataType[];
        name: string;
        profileImage: string;
        template: string;
        title: string;
        workspace: string;
    }

    export interface LinkRequest extends ApiRequest {
        params?: QueryArgs;
        payload?: {
            _id?: string;
            id?: string;
            title?: string;
            target?: string;
            alias?: string;
            workspace?: string;
            domain?: string;
            password?: string;
            enableTracking?: boolean;
            expiryDate?: string | Date;
            archived?: boolean;
            devices?: {
                android?: string;
                ios?: string;
            };
            geo?: Dict;
            utmParams?: UTMParams;
            tags?: { _id: string; name: string }[];
        };
    }
}
export type FindAllLinkResresponseType = {
    data: LinkNameSpace.Link[] | undefined;
    meta: Meta;
};

export interface LinkComponentType {
    findAllLinksResponse: FindAllLinkResresponseType | undefined;
    deleteLink: MutationTrigger<any>;
    createLink: MutationTrigger<any>;
    updateLink: MutationTrigger<any>;
    deleteManyLinks: MutationTrigger<any>;
    duplicate: any;
    isLoading: boolean;
    deleteLinkResponse: Dict;
    updateLinkResponse: Dict;
    setLoadingState: (key: 'duplicating' | 'updating' | 'deleting' | 'finding' | 'creating', value: boolean) => void;
    isLoadingState: boolean;
    createLinkResponse: Dict;
    search: string;
    onSearchChange: (value: string) => void;
    duplicateLinkResponse: Dict;
    findAllLinks: any;
    fetchMetaDataResponse: MetadataResponse | undefined;
    fetchMetaLoading: boolean;
    fetchMetadata: Dict;
    setUrl: Dispatch<SetStateAction<string>>;
    findAllDomainsResponse: DomainNameSpace.Domain[];
    setSearch?: any;
    handleCloseLoading: () => void;
    pagination: UsePaginationState;
    paginationActions: UsePaginationActions;
    params: LinkParams;
    filters: LinkFilters;
    updateFilter: UpdateFilter;
    filterOptions: FilterOptions;
}

export interface SearchType {
    search: string;
    onSearchChange: (value: string) => void;
    filters?: LinkFilters;
    updateFilter?: UpdateFilter;
    filterOptions?: FilterOptions;
}

// export type PathMatcher = Path;
export interface MetadataResponse {
    meta: Meta;
    data: MetaDataInfo;
}

export interface Meta {
    statusCode: number;
    success: boolean;
    pagination: Pagination;
}

export interface MetaDataInfo {
    meta: MetaData;
    og: OpenGraph;
    images: { src: string }[];
}

export interface MetaData {
    title: string;
    url: string;
    description: string;
}

export interface OpenGraph {
    site_name: string;
    url: string;
    title: string;
    image: string;
    description: string;
}

export interface LinkTypeResponse {
    findAllLinksResponse: FindAllLinkResresponseType | undefined;
    isLoading: boolean;
    updateLinkResponse: Dict;
    isLoadingState: boolean;
    updateLink: MutationTrigger<any>;
    setLoadingState: (key: 'duplicating' | 'updating' | 'deleting' | 'finding' | 'creating', value: boolean) => void;
    findAllLinks: any;
    archived: string[];
    handleCheckboxChange: (id: string, isChecked: boolean) => void;
    handleArchivedMany: () => void;
    doFind?: () => void;
}
