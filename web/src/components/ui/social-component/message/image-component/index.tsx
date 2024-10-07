import { ChatMessage } from '@shtcut/types/types';
import React from 'react';

const ImageComponent = ({ message, isSender }: { message: ChatMessage; isSender: boolean }) => {
    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} `}>
            <div
                className={`bg-primary-0 p-3 ${isSender ? 'rounded-b-lg rounded-tl-lg' : 'rounded-b-lg rounded-tr-lg'} `}
            >
                <img src={message.content} alt="Chat image" className="w-80 h-40 object-cover rounded-md " />
            </div>
        </div>
    );
};

export default ImageComponent;
