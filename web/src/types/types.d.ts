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
    solutionValues?: string[];
    handleSelect?: (val: string) => void;
    toolsValues?: string[];
    handleSelectTools?:(val:string)=>void
}

interface PropsCreate extends SolutionType {
    userValue: string;
    handleOptionChange: (value: 'team' | 'myself') => void;
    form: any;
    step: number;
    handlePrevious: () => void;
    handleNext: () => void;
}
