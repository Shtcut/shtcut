type LinkBioDataType = {
    id: number;
    label: string;
    url: string;
    image?: string | null;
};

interface LinkDataAddress {
    street: string;
    country: string;
    city: string;
    zipCode: number;
    state: string;
}

interface LinkDataContact {
    phone: string;
    email: string;
    website: string;
}

interface ContactAction {
    name: string;
    icon: React.ReactNode;
}

interface PhoneTemplateProps {
    contactActions: ContactAction[];
    imageSelected?: string;
    title?: string;
    linksBio?: LinkBioDataType[];
    description?: string;
    presetColor?: string;
    btnColor?: string;
}

export type UseLinksManagerState = {
    links: LinkBioDataType[];
    showSections: Record<number, boolean>;
};

export type UseLinksManagerActions = {
    addLink: () => void;
    removeLink: (id: number) => void;
    updateLink: (id: number, field: string, value: any) => void;
    handleLinkImageChange: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    toggleSection: (id: number) => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type LinksTab = {
    id: string;
    label: string;
};
type UpdateFilter = <K extends keyof LinkFilters>(key: K, value: LinkFilters[K]) => void;

export interface LinkFilters {
    isCustomAlias: boolean | null;
    withTags: boolean | null;
    creator: string | null;
}

interface FilterOption {
    label: string;
    value: string;
}

export interface FilterOptions {
    aliasOptions: FilterOption[];
    tagsOptions: FilterOption[];
}
