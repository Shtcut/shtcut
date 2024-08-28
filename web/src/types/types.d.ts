import { Dict } from "@shtcut-ui/react";

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
    setStep?: Dispatch<SetStateAction<number>>;
    onPrevStep?: () => void;
    onNextStep?: (() => void) | undefined;
    selectedColor?: string;
    btnColor?: string;
    bgColor?: string;
    selectedFrame?: number;
    setSelectedFrame?: (val: number) => void;
    handleColorClick: (color: string) => void;
    setBtnColor?: Dispatch<SetStateAction<string>>;
    setBgColor?: Dispatch<SetStateAction<string>>;
    qrCodeName?: string;
    setQrCodeName?: Dispatch<SetStateAction<string>>;
    handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectQrCodeLogo?: (logo: string | undefined) => void;
    qrCodeLogo?: string;
    qrCodeShape?: QrCodeShape;
    handleChangeQrCodeShape?: Dispatch<SetStateAction<QrCodeShape>>;
    eyeRadius?: EyeRadiusType;
    handleEyeRadiusChange?: (outer: number, inner: number) => void;
    saveModal?: boolean;
    setSaveModal?: Dispatch<SetStateAction<boolean>>;
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
}
export interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}
