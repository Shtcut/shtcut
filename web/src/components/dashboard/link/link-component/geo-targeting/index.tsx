import { Switch } from '@shtcut-ui/react';
import CountriesInput from '@shtcut/components/form/countries-form';
import React, { useState } from 'react';

const GeoTargeting = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Geo Targeting</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Target specific countries or regions</p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
            </div>
            {isSwitchOn && (
                <div className="mt-3">
                    <CountriesInput noRadius value={''} classNames="rounded-md" onChange={() => {}} />
                </div>
            )}
        </div>
    );
};

export default GeoTargeting;
