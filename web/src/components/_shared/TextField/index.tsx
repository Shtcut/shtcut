'use client';

import { Input } from '@shtcut-ui/react';
import { isEmpty, omit } from 'lodash';
import { HTMLProps, useId, useState } from 'react';

interface TextFieldProps extends HTMLProps<HTMLInputElement> {
    label?: string;
    labelClassName?: string;
    errorText?: string;
    onShowPassword?: (show: boolean) => void;
}

export const TextField = (props: TextFieldProps) => {
    const { label, type, labelClassName, className, id, errorText, onShowPassword, ...rest } = props;

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const _id = useId();
    const hasError = errorText && !isEmpty(errorText);
    const inputErrorClassName =
        'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 text-black outline-none';

    const handleOnShowPassword = () => {
        setShowPassword(!showPassword);
        if (onShowPassword) {
            onShowPassword(!showPassword);
        }
    };

    return (
        <div>
            {label && <label className="font-normal">{label}</label>}
            <div className={`${label ? 'mt-2' : 'mb-4'} w-full`}>
                <Input
                    id={`${id ?? ''}${type}-${_id}`}
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                    className={className}
                    {...omit(rest, ['ref'])}
                />
                {type === 'password' && (
                    <div className="absolute top-10 right-0  mr-2 cursor-pointer" onClick={handleOnShowPassword}></div>
                )}
            </div>
        </div>
    );
};
