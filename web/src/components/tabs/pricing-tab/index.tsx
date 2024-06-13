'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';

const PricingTab = () => {
    return (
        <>
            <Tabs defaultValue="account" className="w-[276px]  rounded-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#F0F0F0] rounded-full h-12">
                    <TabsTrigger value="account" className="rounded-full h-10 space-x-1 font-semibold">
                        Yearly
                    </TabsTrigger>
                    <TabsTrigger value="password" className="rounded-full h-10 font-semibold">
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
