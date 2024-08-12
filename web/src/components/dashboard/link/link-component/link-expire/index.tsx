import { Switch } from '@shtcut-ui/react';
import { DatePicker } from '@shtcut/components/_shared/DatePicker';
import React, { useState } from 'react';

const LinkExpire = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Link Expiration</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Set an expiration date for your link</p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
            </div>
            {isSwitchOn && (
                <div>
                    <p className="text-xs mb-2 mt-3">End date</p>
                    <DatePicker showIcon={false} />
                </div>
            )}
        </div>
    );
};

export default LinkExpire;
