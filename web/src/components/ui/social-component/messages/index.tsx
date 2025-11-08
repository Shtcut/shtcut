'use client';

import { Button, Separator } from '@shtcut-ui/react';
import React, { useState } from 'react';
import ChatList from './chat-list';
import ChatScreen from './chat-screen';
import { ChatConversation } from '@shtcut/types/types';
import { motion } from 'framer-motion';
import { useTabNavigation } from '@shtcut/hooks/use-tab-navigation';
import Tabs from '@shtcut/components/_shared/Tabs';
import FilesTab from './component/files';
import LinksTab from './component/links';
import { LogOut, Trash, Trash2 } from 'lucide-react';
import InfoTabs from './component/info';
import StarredComponent from './component/starred';

const MessagesComponent = () => {
    const [singleChat, setSingleChat] = useState<ChatConversation | null>(null);
    const handleChatMessage = (chat: ChatConversation) => {
        setSingleChat(chat);
    };
    const tabs = [
        { id: 'info', label: 'Info' },
        { id: 'files', label: 'Files' },
        { id: 'links', label: 'Links' },
        { id: 'starred', label: 'Starred' }
    ];
    const { currentTab, selectedTabIndex, handleTabChange, resetTab } = useTabNavigation(tabs);

    const [isModalOpen, setIsModalOpen] = useState<boolean | string>(currentTab);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
        setIsModalOpen(false);
        resetTab();
    };
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Messages</h1>
                <Button className="text-xs font-semibold bg-primary-0">Create Group</Button>
            </div>
            <section className="relative ">
                <section className="flex border mt-8  rounded-md h-[650px]">
                    {(isModalOpen || showModal) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 cursor-pointer bg-black/5 backdrop-blur-sm rounded-md   z-30 "
                            onClick={handleClose}
                        />
                    )}
                    <div className="border-r  w-[340px] h-full">
                        <ChatList handleChatMessage={handleChatMessage} />
                    </div>

                    <div className="relative w-full h-full">
                        <ChatScreen
                            singleChat={singleChat}
                            onClickDelete={() => setShowModal(true)}
                            onClickDrawer={() => setIsModalOpen(true)}
                        />
                        {isModalOpen && (
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '100%', opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="absolute top-0 right-0 w-[350px] h-full bg-white  rounded-tr-md rounded-br-md border-l z-50 "
                            >
                                <section className="flex flex-col justify-between h-full">
                                    <div>
                                        <section className="w-full p-4">
                                            <Tabs
                                                tabs={tabs}
                                                selectedTabIndex={selectedTabIndex}
                                                onTabClick={handleTabChange}
                                            />
                                        </section>
                                        {selectedTabIndex === 0 && <InfoTabs />}
                                        {selectedTabIndex === 1 && <FilesTab />}
                                        {selectedTabIndex === 2 && <LinksTab />}
                                        {selectedTabIndex === 3 && <StarredComponent />}
                                    </div>
                                    <div className="p-4  flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <LogOut size={18} className="text-[#6E6E6E]" />
                                            <p className="text-xs text-[#6E6E6E] font-medium">Leave Group</p>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center gap-2">
                                            <Trash size={18} className="text-[#6E6E6E]" />
                                            <p className="text-xs text-[#6E6E6E] font-medium">Delete Group</p>
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        )}
                    </div>

                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 z-40 flex items-center  justify-center "
                        >
                            <div className="bg-white p-6 rounded-lg shadow-sm   max-w-sm  flex flex-col items-center justify-center">
                                <div className="flex w-12 h-12 rounded-full bg-[#FEF3F2] justify-center items-center">
                                    <div className="w-9 h-9 rounded-full flex justify-center items-center bg-[#FEE4E2]">
                                        <Trash2 size={18} className="text-[#D92D20]" />
                                    </div>
                                </div>
                                <h2 className=" font-semibold text-center">Delete Message</h2>
                                <p className="text-sm text-center text-gray-600 mt-2">
                                    Are you sure you want to delete this message?This action can not be undone.
                                </p>
                                <div className="mt-4 flex w-full items-center gap-3">
                                    <Button className="w-full" variant="outline" onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                    <Button className="bg-primary-0 w-full" onClick={() => setShowModal(false)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </section>
            </section>
        </div>
    );
};

export default MessagesComponent;
