'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button, Calendar, cn, Popover, PopoverContent, PopoverTrigger } from '@shtcut-ui/react';

type IProps = {
    showIcon?: boolean;
    onDateChange?: (date: Date | undefined) => void;
    selectedDate?: Date | undefined; 
};

export function DatePicker({ showIcon, onDateChange, selectedDate }: IProps) {
    const handleDateChange = (selectedDate: Date | undefined) => {
        if (onDateChange) {
            onDateChange(selectedDate); // Pass the selected date to the parent component
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !selectedDate && 'text-muted-foreground'
                    )}
                >
                    {showIcon && <CalendarIcon className="mr-2 text-xs h-4 w-4" />}
                    {selectedDate ? format(selectedDate, 'PPP') : <span className=" text-xs ">DD/MM/YYYY</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar className=" " mode="single" selected={selectedDate} onSelect={handleDateChange} />
            </PopoverContent>
        </Popover>
    );
}
