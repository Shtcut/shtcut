import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shtcut-ui/react';
import React from 'react';

const AmPmToggle = () => {
    return (
        <div>
            <Tabs defaultValue="am" className="w-full">
                <TabsList className=" h-9 grid grid-cols-2 bg-[#7676801F] border w-24 border-[#7676801F] gap-0 m-0 p-0 ">
                    <TabsTrigger
                        className="border border-none shadow-none text-black/60 h-full   w-full data-[state=active]:text-black  data-[state=active]:font-semibold font-normal data-[state=active]:bg-white text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                        value="am"
                    >
                        AM
                    </TabsTrigger>
                    <TabsTrigger
                        className="border border-none shadow-none text-black/60 h-full w-full data-[state=active]:text-black  data-[state=active]:font-semibold font-normal data-[state=active]:bg-white text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                        value="pm"
                    >
                        pm
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};

export default AmPmToggle;
