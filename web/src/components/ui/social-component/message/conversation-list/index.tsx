import { faker } from '@faker-js/faker';
import { Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shtcut-ui/react';

import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import TextSlice from '@shtcut/components/text-slice';
import { ChatItem } from '@shtcut/types/types';
import { CheckCheck } from 'lucide-react';
import React, { use } from 'react';
import { FaRegImage } from 'react-icons/fa';

interface ConversationListProps {
    users: ChatItem[];
    setActiveUser: (user: ChatItem) => void;
    activeUser: ChatItem;
}

const ConversationList = ({ users, setActiveUser, activeUser }: ConversationListProps) => {
    return (
        <div className="w-1/3  overflow-y-auto h-full border-r">
            <section className="sticky p-4 top-0 rounded-md bg-white">
                <SearchInput
                    classNames="w-full h-[34px] shadow-none border-gray-200 ring-0   focus-visible:ring-0"
                    className="w-full"
                />
            </section>
            <ul className="p-4">
                {users.map((user, index) => {
                    const lastMessage = user.messages[user.messages.length - 1];

                    return (
                        <section className="" key={user.id}>
                            <li
                                key={user.id}
                                className={`px-2 py-3 cursor-pointer ${user.id === activeUser.id ? 'bg-[#FAFAFA] rounded-md' : ''} `}
                                onClick={() => setActiveUser(user)}
                            >
                                <div className="flex justify-between">
                                    <div className="w-full">
                                        <img
                                            src={faker.image.avatar()}
                                            className="w-10 h-10 mr-2 rounded-full float-left"
                                            alt=""
                                        />
                                        <div className="">
                                            <p className="font-semibold text-sm"> {user.sender}</p>
                                            <p className="text-xs text-[#9F9C9C]  ">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger className="">
                                                            {lastMessage.type === 'image' ? (
                                                                <FaRegImage color="#2F64E9" size={18} />
                                                            ) : (
                                                                <TextSlice text={lastMessage.content} wordLimit={1} />
                                                            )}
                                                        </TooltipTrigger>
                                                        <TooltipContent>{lastMessage.content}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-1/3 flex flex-col items-end gap-y-1 ">
                                        <p className="text-[#9F9C9C] text-xs">1m Ago</p>
                                        <CheckCheck size={12} color="#2F64E9" />
                                    </div>
                                </div>
                            </li>
                            <Separator
                                orientation="horizontal"
                                className={`my-2 ${index !== users.length - 1 ? '' : 'bg-transparent'}`}
                            />
                        </section>
                    );
                })}
            </ul>
        </div>
    );
};

export default ConversationList;
