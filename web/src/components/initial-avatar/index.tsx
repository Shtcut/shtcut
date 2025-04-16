/** @format */

import { getColorByName, getInitials } from '@shtcut/_shared/constant';
import React from 'react';

interface InitialsAvatarProps {
    name: string;
    size?: number;
    className?: string;
}

const InitialsAvatar = ({ name, size = 27, className = '' }: InitialsAvatarProps) => {
    const initials = getInitials(name);
    const colorSet = getColorByName(name);

    return (
        <div
            className={`flex justify-center items-center rounded-full shadow border border-gray-100  ${colorSet.bg} ${colorSet.text} ${className}`}
            style={{ width: size, height: size }}
        >
            <p className="font-medium" style={{ fontSize: size * 0.37 }}>
                {initials}
            </p>
        </div>
    );
};

export default InitialsAvatar;
