// ChatScreen.tsx
import React from 'react';
import { ChatItem, User } from '@shtcut/types/types';
import Message from '../render-message';
import { Dot } from 'lucide-react';

type ChatScreenProps = {
    activeUser: ChatItem;
};

const ChatScreen = ({ activeUser }: ChatScreenProps) => {
    console.log('active:::', activeUser);
    return (
        <div className=" overflow-y-auto">
            <section className="sticky bg-white rounded-tr-md top-0 border-b h-14 flex flex-col justify-center px-4">
                <div className="w-full">
                    <img src={activeUser.image} className="w-10 h-10 mr-3 rounded-full float-left" alt="" />
                    <div>
                        <p className="font-semibold">{activeUser.sender}</p>
                        <div className="flex items-center gap-x-2">
                            <div className="bg-[#25C78B] w-1.5 h-1.5 rounded-full" />
                            <p className="text-xs text-[#433E3F] font-medium">20 members</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-4">
                {activeUser.messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
            </section>
        </div>
    );
};

export default ChatScreen;
