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
