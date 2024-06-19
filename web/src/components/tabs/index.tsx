'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';

const PlanTab = () => {
    return (
        <>
            <Tabs defaultValue="account" className="w-[400px] rounded-full">
                <TabsList className="grid w-full grid-cols-2 rounded-full h-12">
                    <TabsTrigger value="account" className="rounded-full h-10 space-x-1 font-semibold">
                        Yearly{' '}
                        <span className="text-white bg-primary-0 text-[10px] rounded-full px-2 py-0.5 ml-2">
                            SAVE UP TO 25%
                        </span>
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

export default PlanTab;
