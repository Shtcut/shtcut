import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shtcut-ui/react';
import { months } from '@shtcut/_shared/data';
import React from 'react';

const SelectMonths = ({
    handleSelect,
    selectedMonth
}: {
    handleSelect: (val: string) => void;
    selectedMonth: string | null;
}) => {
    return (
        <div className="w-[100px] ">
            <Select onValueChange={handleSelect}>
                <SelectTrigger id="select-month" className=" text-[10px] text-[#2B3034]  shadow-none ">
                    <SelectValue placeholder="month" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month) => (
                        <SelectItem key={month.value} value={month.value} className="text-xs text-[#2B3034]">
                            {month.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectMonths;
