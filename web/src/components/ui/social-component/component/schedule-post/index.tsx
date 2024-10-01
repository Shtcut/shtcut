import { Button, Calendar } from '@shtcut-ui/react';
import React from 'react';
import AmPmToggle from '../am-pm';
import TimePicker from '@shtcut/components/time-picker';

const SchedulePostModal = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <div>
            <section className="flex border-b pb-2 items-center justify-between">
                <p className="text-sm font-semibold">Schedule Posts </p>
            </section>
            <div className="border-[0.5px] mt-6 rounded-sm border-[#CCCBCB] bg-[#FAFAFA]  flex items-center">
                <Calendar className="flex justify-center w-full" />
            </div>
            <section className="flex py-4 items-center justify-between">
                <p className="text-sm font-semibold">Time</p>
                <div className="flex gap-x-2 items-center">
                    <TimePicker />

                    <AmPmToggle />
                </div>
            </section>
            <section className="flex items-center mt-8 gap-x-4 w-full">
                <Button onClick={handleClose} variant={'outline'} className="w-full text-xs">
                    Cancel
                </Button>
                <Button className="w-full text-xs bg-primary-0">Schedule</Button>
            </section>
        </div>
    );
};

export default SchedulePostModal;
