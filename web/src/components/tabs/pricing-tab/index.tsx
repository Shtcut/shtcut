'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';

const PricingTab = () => {
    return (
        <>
            <Tabs defaultValue="yearly" className="w-full flex justify-center  rounded-full">
                <TabsList className="grid sm:w-[276px] rounded-full  h-12 border-b grid-cols-2  bg-[#f0f0f0] ">
                    <TabsTrigger
                        value="yearly"
                        className="text-secondary-5 font-medium rounded-full  h-full data-[state=active]:text-primary data-[state=active]:border-primary  "
                    >
                        Yearly
                    </TabsTrigger>
                    <TabsTrigger value="password" className="rounded-full h-full font-semibold">
                        Monthly
                    </TabsTrigger>
                </TabsList>
                {/* <TabsContent value="account">divhe</TabsContent> */}
                <TabsContent value="password"></TabsContent>
            </Tabs>
        </>
    );
};

export default PricingTab;
