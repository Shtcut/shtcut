// Message.tsx
import { ChatMessage } from '@shtcut/types/types';
import React from 'react';
import TextMessage from '../text-message';
import ImageComponent from '../image-component';

const Message = ({ message }: { message: ChatMessage }) => {
    switch (message.type) {
        case 'text':
            return <TextMessage message={message} isSender={message.sender === 'You'} />;
        case 'image':
            return <ImageComponent message={message} isSender={message.sender === 'You'} />;
        case 'audio':
            return (
                <div className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
                    <audio controls>
                        <source src={message.content} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            );
        default:
            return null;
    }
};

export default Message;
