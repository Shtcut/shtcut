'use client';

import { Input, InputProps } from '@shtcut-ui/react';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { HiOutlineEyeOff, HiOutlineEye }  from 'react-icons/hi';

interface PasswordInputProps extends InputProps {
    onVisibleChange?: (visible: boolean) => void;
}

export const PasswordInput = (props: PasswordInputProps) => {
    const { onVisibleChange, ...rest } = props;

    const [pwInputType, setPwInputType] = useState('password');

    const onPasswordVisibleClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        const nextValue = pwInputType === 'password' ? 'text' : 'password';
        setPwInputType(nextValue);
        onVisibleChange?.(nextValue === 'text');
    };

    return (
        <Input
        />
    )
};
