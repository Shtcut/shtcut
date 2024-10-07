import { Input } from '@shtcut-ui/react';
import { ChatItem, Message, User } from '@shtcut/types/types';
import React, { useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';

interface ChatInputProps {
    activeUser: ChatItem;
    setActiveUser: (user: ChatItem) => void; // Function to update the active user
}

const ChatInput = ({ activeUser, setActiveUser }: ChatInputProps) => {
    const [message, setMessage] = useState('');

    // const handleSendMessage = () => {
    //     if (message.trim()) {
    //         // Create a new message object
    //         const newMessage: Message = {
    //             text: message,
    //             sender: 'me', // Indicate the message is sent by the user
    //             timestamp: new Date()
    //         };

    //         // Add the message to the conversation
    //         setActiveUser({
    //             ...activeUser,
    //             messages: [...activeUser.messages, newMessage] // Add the new message to the messages array
    //         });

    //         // Clear the input field
    //         setMessage('');
    //     }
    // };

    return (
        <div className="w-full relative  border-t flex items-center">
            <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send your message…"
                className="p-2 w-full border-none h-14 ring-0   focus-visible:ring-0 "
            />
            <button
                onClick={() => {}}
                className="h-9 w-9 flex justify-center items-center  mr-4 bg-blue-500 text-white rounded-full "
            >
                <BsFillSendFill />
            </button>
        </div>
    );
};

export default ChatInput;
