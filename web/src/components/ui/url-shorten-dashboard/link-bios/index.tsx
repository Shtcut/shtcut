import { Button } from '@shtcut-ui/react';
import React from 'react';
import LinkBioCard from './components/link-bio-card';

const LinkBiosComponent = () => {
    return (
        <div>
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link-in-bio</h1>

                <Button className="bg-primary-0 text-xs h-8 rounded ">Create New Link</Button>
            </div>
            <div className="flex flex-col gap-y-[14px] mt-8">
                {[1, 2, 3, 4, 5].map((data, index) => (
                    <div key={index}>
                        <LinkBioCard />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LinkBiosComponent;
