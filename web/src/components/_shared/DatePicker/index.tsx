'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button, Calendar, cn, Popover, PopoverContent, PopoverTrigger } from '@shtcut-ui/react';

type IProps = {
    showIcon?: boolean;
};

export function DatePicker({ showIcon }: IProps) {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                    {showIcon && <CalendarIcon className="mr-2 text-xs h-4 w-4" />}
                    {date ? format(date, 'PPP') : <span className=" text-xs ">DD/MM/YYYY</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto   p-0">
                <Calendar className=" " mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
        </Popover>
    );
}
