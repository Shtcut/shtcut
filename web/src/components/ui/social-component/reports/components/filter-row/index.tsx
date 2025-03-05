import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@shtcut-ui/react';
import { Checkbox } from '@shtcut-ui/react';
import { ChevronDown } from 'lucide-react';
import { filterOptions } from '@shtcut/_shared/data';

const FilterDropdown = ({ options }: { title: string; options: string[] }) => {
    const [selectedOption, setSelectedOption] = useState<string>(options[0]);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <Popover>
            <PopoverTrigger className="flex items-center justify-between px-3 py-1.5 border rounded-md text-[13px] w-full">
                {selectedOption}
                <ChevronDown className="ml-2 w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-2 shadow-md rounded-lg bg-white">
                {options.map((option) => (
                    <div
                        key={option}
                        className="flex items-center space-x-2 cursor-pointer px-2 py-1"
                        onClick={() => handleSelect(option)}
                    >
                        <Checkbox checked={selectedOption === option} onCheckedChange={() => handleSelect(option)} />
                        <span className="text-sm">{option}</span>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
};

const FilterRow = () => {
    return (
        <div className="flex gap-4">
            {Object.entries(filterOptions).map(([key, options]) => (
                <FilterDropdown key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} options={options} />
            ))}
        </div>
    );
};

export default FilterRow;
