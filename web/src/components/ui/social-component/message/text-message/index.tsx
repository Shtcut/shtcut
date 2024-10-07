/** @format */

import { ChatItem, ChatMessage } from '@shtcut/types/types';

const TextMessage = ({ message, isSender }: { message: ChatMessage; isSender: boolean }) => (
    <section className="my-3">
        <div className={`flex  ${isSender ? 'justify-end' : 'justify-start'}  `}>
            <div
                className={`p-2 my-1  text-sm max-w-80   ${
                    isSender
                        ? 'bg-blue-500 text-white shadow-none rounded-b-lg rounded-tl-lg '
                        : ' rounded-b-lg shadow-sm border border-black/5 rounded-tr-lg rounded-none  text-[#2B2829]'
                }`}
            >
                {message.content}
            </div>
        </div>
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
            <p className="text-xs text-[#9F9C9C]">Today 11:52</p>
        </div>
    </section>
);

export default TextMessage;
