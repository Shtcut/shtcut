'use client';

import * as React from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';

interface TimeDropdownProps {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    className?: string;
}

const hoursArray = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')); // ['01', '02', ..., '12']
const minutesArray = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')); // ['00', '01', ..., '59']

const TimeDropdown: React.FC<TimeDropdownProps> = ({ value, onChange, label, className }) => {
    const [selectedHours, setSelectedHours] = React.useState<string>(value ? value.split(':')[0] : '01');
    const [selectedMinutes, setSelectedMinutes] = React.useState<string>(value ? value.split(':')[1] : '00');
    const [open, setOpen] = React.useState<boolean>(false); //

    const handleTimeChange = (h: string, m: string) => {
        setSelectedHours(h);
        setSelectedMinutes(m);
        if (onChange) {
            onChange(`${h}:${m}`);
        }
    };

    return (
        <div className={`relative inline-block ${className}`}>
            {label && <label className="block mb-1">{label}</label>}
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <p
                        className="cursor-pointer border h-9 rounded-md text-xs font-medium bg-[#7676801F] w-20 border-[#7676801F] flex items-center justify-center"
                        onClick={() => setOpen(true)}
                    >
                        {selectedHours}:{selectedMinutes}
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit justify-center flex gap-x-2">
                    <div className="flex flex-col overflow-y-auto max-h-48 border-gray-300">
                        {hoursArray.map((hour) => (
                            <DropdownMenuCheckboxItem
                                key={hour}
                                className={`p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 ${selectedHours === hour ? 'bg-gray-200' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTimeChange(hour, selectedMinutes);
                                }}
                            >
                                {hour}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </div>

                    <div className="flex flex-col overflow-y-auto max-h-48">
                        {minutesArray.map((minute) => (
                            <DropdownMenuCheckboxItem
                                key={minute}
                                className={`p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 ${selectedMinutes === minute ? 'bg-gray-200' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTimeChange(selectedHours, minute);
                                }}
                            >
                                {minute}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TimeDropdown;
