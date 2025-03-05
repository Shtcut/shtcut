'use client';

// SocialMediaInbox.tsx
import React, { useState } from 'react';
import { socialMessages } from '@shtcut/_shared/data';
import SocialMessageCard from '../social-message-card';
import FilterRow from '../filter-row';
import SocialMediaSidebar from '../side-bar';

const SocialMediaInbox = () => {
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>(['wellness-crest', 'marah-james']);

    const toggleAccount = (id: string) => {
        if (selectedAccounts.includes(id)) {
            setSelectedAccounts(selectedAccounts.filter((accountId) => accountId !== id));
        } else {
            setSelectedAccounts([...selectedAccounts, id]);
        }
    };

    return (
        <div className="w-full  mt-6 bg-white">
            {/* Mobile View */}
            {/* <div className="block md:hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Social Inbox</h2>
                    <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu size={20} />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Accounts</h3>
                                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                                        <X size={20} />
                                    </Button>
                                </div>
                                <ScrollArea className="h-[70vh]">
                                    <SocialMediaSidebar
                                        selectedAccounts={selectedAccounts}
                                        toggleAccount={toggleAccount}
                                    />
                                </ScrollArea>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>

                <div className="p-4">
                    <ScrollArea className="max-w-full">
                        <div className="flex gap-2 mb-4 pb-2 overflow-x-auto">
                            {Object.entries(filterOptions).map(([key, options]) => (
                                <Select key={key}>
                                    <SelectTrigger className="min-w-32">
                                        <SelectValue placeholder={options[0]} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option) => (
                                            <SelectItem key={option} value={option.toLowerCase()}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="space-y-3">
                        {socialMessages.map((message) => (
                            <SocialMessageCard key={message.id} message={message} />
                        ))}
                    </div>
                </div>
            </div> */}

            <div className="hidden md:flex  ">
                <div className="w-64 h-fit rounded-md lg:w-72 border  p-4 flex-shrink-0">
                    <SocialMediaSidebar selectedAccounts={selectedAccounts} toggleAccount={toggleAccount} />
                </div>

                <div className="flex-1 px-4 w-full overflow-hidden">
                    <FilterRow />
                    <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-180px)] mt-4">
                        {socialMessages.map((message) => (
                            <SocialMessageCard key={message.id} message={message} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaInbox;
