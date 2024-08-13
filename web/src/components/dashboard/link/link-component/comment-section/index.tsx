import { Switch } from '@shtcut-ui/react';

import React from 'react';

const CommentSection = () => {
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Comments</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Allow comments on your link</p>
                </div>
                <div>
                    <Switch />
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
