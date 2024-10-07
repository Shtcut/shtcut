'use client';
import { Button } from '@shtcut-ui/react';
import { ChatItem } from '@shtcut/types/types';
import React, { useState } from 'react';
import ConversationList from './conversation-list';
import ChatInput from './chat-input';
import ChatScreen from './chat-screen';
import { chatData } from '@shtcut/_shared/data/chat';

const MessageComponent = () => {
    const [activeUser, setActiveUser] = useState<ChatItem>(chatData[0]);

    return (
        <div className="h-full">
            <section className="flex items-center justify-between">
                <h1 className="font-semibold text-[#2B2829] text-xl">Messages</h1>
                <Button className="h-9 text-xs bg-primary-0">Create Group</Button>
            </section>
            <div className="flex h-[700px] border mt-8 rounded-md">
                <ConversationList users={chatData} setActiveUser={setActiveUser} activeUser={activeUser} />

                <div className=" flex flex-col h-full justify-between w-full relative">
                    <ChatScreen activeUser={activeUser} />
                    <ChatInput activeUser={activeUser} setActiveUser={setActiveUser} />
                </div>
            </div>
        </div>
    );
};

export default MessageComponent;
