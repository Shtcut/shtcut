import React, { useState } from 'react';
import { Switch, Textarea } from '@shtcut-ui/react';
import Image from 'next/image';
import EmojiPicker from 'emoji-picker-react';

const CommentSection = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [comment, setComment] = useState('');

    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };


    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Comments</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Allow comments on your link</p>
                </div>
                <div>
                    <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
                </div>
            </div>
            {isSwitchOn && (
                <div className="mt-2 flex gap-3 items-start">
                    <div>
                        <Image
                            src={'/images/meal.jpg'}
                            width={30}
                            height={30}
                            className="rounded-full object-contain"
                            alt="comment user"
                        />
                    </div>
                    <div className="relative w-full">
                        <Textarea
                            className="min-h-[100px] resize-none text-sm"
                            id="feedback"
                            placeholder="Your comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 p-2 rounded-full "
                            onClick={() => setShowEmojiPicker((prev) => !prev)}
                        >
                            😊
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute z-50 top-12 right-1">
                                <EmojiPicker />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
