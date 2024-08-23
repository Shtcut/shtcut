import { Check } from 'lucide-react';
const SelectValue = ({
    label,
    value,
    selected,
    onSelect,
    icon,
    description
}: {
    label: string;
    value: 'team' | 'personal';
    selected: boolean;
    onSelect: (value: 'team' | 'personal') => void;
    description: string;
    icon: React.ReactNode;
}) => {
    return (
        <div
            onClick={() => onSelect(value)}
            className={`w-full h-[120px] relative  cursor-pointer border rounded-md p-4  transition-colors duration-300 ${
                selected ? 'bg-primary-0 text-[#FAFAFA] border-primary-0' : ' text-[#5b5a5b] border-[#5b5a5b]'
            }`}
        >
            <div className="flex md:flex-row flex-col md:items-center justify-center h-full gap-x-2">
                <div className={` ${selected ? 'text-white' : 'text-[#6b6969]'}`}>{icon}</div>
                <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
            {selected && (
                <div className="flex justify-end top-4 right-4 absolute">
                    <div className="w-[18px] h-[18px] bg-[#7498F0] rounded-full flex justify-center items-center">
                        <div className="w-[14px] flex items-center justify-center bg-white h-[14px] rounded-full">
                            <Check size={'10px'} className="text-primary-0" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectValue;
