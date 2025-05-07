import { Dict } from '@shtcut-ui/react';
import { DomainNameSpace } from '@shtcut/_shared/namespace/domain';

interface Props {
    color?: string;
    size?: number;
}
type GeneralType = {
    id: number;
    icons?: IconType;
    title: string;
    text?: string;
};

interface Plan {
    id: number;
    status: string;
    amt: number | string;
    section?: string;
    text: string;
    data: string[];
}

interface TypingTextProps {
    text: string;
    speed: number;
}

interface IntegrationSectionType {
    text: string;
    id: string;
    img: string[];
    title: string;
}

interface PlanCard {
    plan: {
        id: number;
        title: string;
        text: string;
        amt: string;
        plan: string;
        btnText: string;
        plans: string[];
    };
}

interface SolutionType {
    modules?: string[];
    handleSelect?: (val: string) => void;
    toolsValues?: string[];
    handleSelectTools?: (val: string) => void;
    isLoading?: boolean;
}

interface PropsCreate extends SolutionType {
    userValue: string;
    handleOptionChange: (value: 'team' | 'personal') => void;
    form: Dict;
    formValidation?: Dict;
    step: number;
    handlePrevious: () => void;
    handleNext: () => void;
}
type QrCodeShape = 'squares' | 'dots' | 'fluid' | undefined;
export type EyeRadiusType = [
    { outer: number; inner: number },
    { outer: number; inner: number },
    { outer: number; inner: number }
];

interface QrCodeInterface {
    step?: number;
    saveModal?: boolean;
    setSaveModal?: Dispatch<SetStateAction<boolean>>;
    handleTabChange?: Dispatch<SetStateAction<string>>;
    switchTab?: string;
    register?: UseFormRegister<any>;
    getQrCodeData?: QRCodeDataResponse | undefined;
    editId?: string;
    isLoadingGetQrCode?: boolean;
}

export interface PropsColor extends QrCodeInterface {
    handleColorClick: (val: string) => void;
    setBgColor?: Dispatch<SetStateAction<string>>;
    bgColor?: string;
    setBtnColor?: Dispatch<SetStateAction<string>>;
    btnColor?: string;
    setSelectedFrame?: Dispatch<SetStateAction<number>>;
    selectedFrame?: number;
    handleTabChange?: Dispatch<SetStateAction<string>>;
}

export interface QrCodeFrameType {
    bgColor?: string | undefined;
    selectedColor: string | undefined;
    btnColor?: string | undefined;
    qrCodeName?: string | undefined;
    qrCodeLogo?: string;
    qrCodeShape?: QrCodeShape;
    eyeRadius?: EyeRadiusType;
    cancelModal?: () => void;
}
export interface CommonProps {
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

export interface WorkspaceLayoutProps extends CommonProps {
    header?: ReactNode | ReactNode[];
}

export type RoutePaths = {
    login: string;
    signUp: string;
    welcome: string;
    verify: string;
    workspace: string;
};

export interface PostInterface {
    id: string;
    title: string;
    images: string;
    color: string;
    text: string;
    timeline: string;
    objectData: { text: string; color: string }[];
}
export interface DomainsTypes {
    setShowModal?: Dispatch<SetStateAction<boolean>>;
    showModal?: boolean;
    handleModalShow: (open: boolean) => void;
    setCnModal?: Dispatch<SetStateAction<boolean>>;
    cnModal?: boolean;
    handleModalCn: (open: boolean) => void;
    selectedTabIndex: number;
    setSelectedTabIndex: Dispatch<SetStateAction<number>>;
    handleTabClick: (tab: number) => void;
    findAllDomainsResponse: DomainNameSpace.Domain[];
}
export interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}

interface PostContentProps {
    postText: string;
    handleTextChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    selectedImages?: File[] | undefined;
    setSelectedImages?: React.Dispatch<React.SetStateAction<File[]>> | undefined;
    handleOpen?: (open: boolean, modalType: string) => void;
    setPostText?: React.Dispatch<React.SetStateAction<string>>;
}

type SocialPost = {
    channels: string | string[];
    status: 'Published' | 'Scheduled' | 'Failed' | 'Draft';
    post: string;
    date: string;
    label: string | string[];
    author: string;
};
export type EventParam = {
    id: string;
    title: string;
    start: string;
    eventColor: string;
    end?: string;
    type?: string;
};
export type SelectedEvent = EventParam & { type: 'NEW' | 'EDIT' };

interface SocialMedia {
    id: string;
    default_img: string[];
    name: string;
    isActive: boolean;
}
export type GeoTarget = { region: string; url: string };
export type ModalType =
    | 'deleteModal'
    | 'duplicateModal'
    | 'qrCodeModal'
    | 'archiveModal'
    | 'shareModal'
    | 'add-tags'
    | 'updateModal'
    | null;
interface QrCodeHeaderTypes {
    label: string;
    description: string;
    isVisible: boolean;
    toggleVisibility: () => void;
    titleValue: string;
    descriptionValue: string;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImage: string | null;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showAddress?: boolean;
}
export interface ContactActions {
    name: string;
    icon: any;
}
export type MessageType = 'text' | 'image' | 'file';

export interface ChatMessage {
    id: string;
    sender: 'me' | 'others';
    senderName: string;
    content: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
    type: MessageType;
}

export interface ChatConversation {
    conversationId: string;
    participants: string[];
    messages: ChatMessage[];
}

interface SettingsComponentType {
    findAllTagsResponse: TagResponse[] | undefined;
    isLoading: boolean;
    isLoadingState: boolean;
    deleteTag: MutationTrigger<any>;
    setLoadingState: (key: 'creating' | 'deleting', value: boolean) => void;
    findAllTags: any;
    deleteTagResponse: Dict;
    pagination: UsePaginationState;
    paginationActions: UsePaginationActions;
    totalCount: number;
    changePassword?: MutationTrigger<any>;
    changePasswordResponse?: any;
}

interface DeleteComponentType {
    isLoadingState: boolean;
    handleDelete: () => void;
    handleClose: () => void;
}

interface GeneralResponse {
    publicId: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    id: string;
    __v: number;
}

interface ContactInfo {
    phoneNumber?: string;
    email: string;
    websiteUrl: string;
    streetAddress: string;
    country: string;
    state: string;
    zipCode: string;
    city: string;
}

interface CompanyInfo {
    name: string;
    department: string;
}

type UTMParams = {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
};

type Devices = {
    android: string;
    ios: string;
};

type Domain = {
    _id: string;
    publicId: string;
    user: string;
    workspace: string;
    links: any[];
    name: string;
    slug: string;
    landingPage: string;
    verification: any[];
    verified: boolean;
    isDefault: boolean;
    type: string;
    banned: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
};

type Metadata = {
    title: string;
    description: string;
    image: string;
    url: string;
    images: string[];
};

type RedirectUrlType = {
    utmParams: UTMParams;
    devices: Devices;
    _id: string;
    publicId: string;
    alias: string;
    target: string;
    domain: Domain;
    enableTracking: boolean;
    title: string;
    expiryDate: string;
    tags: string[];
    metadata: Metadata;
    proxy: boolean;
    isPrivate: boolean;
    clicks: number;
    archived: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    qrCode: string;
    id: string;
};

interface UseProps {
    id?: string;
    key?: string;
    call?: boolean;
    search?: string;
    filter?: Dict;
    url?: string;
    all?: boolean;
}

interface GeneralState {
    title: string;
    description: string;
    image: string;
    step: number;
    template: string | undefined;
    bgColor: string;
    presetColor: string;
    btnColor: string;
    selectedTab: number;
    borderColor: string | undefined;
    socialLinks: { [key: string]: string };
    contactInfo: ContactInfo;
    company: CompanyInfo;
    file: any | null;
    url: string;
}

interface Task {
    id: string;
    content: string;
    description: string;
    time: string;
    comments: number;
}

export interface Column {
    title: string;
    items: Task[];
}

interface Columns {
    [key: string]: Column;
}
