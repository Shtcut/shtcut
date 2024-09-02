'use client';

import { Input, InputProps, cn } from '@shtcut-ui/react';
import { isEmpty } from 'lodash';
import { useId } from 'react';
import { PasswordInput } from '..';

interface TextFieldProps extends InputProps {
    label?: string;
    labelClassName?: string;
    errorText?: string;
    showPasswordIcon?: boolean;
    onShowPassword?: (show: boolean) => void;
}

export const TextField = (props: TextFieldProps) => {
    const { label, type, className, id, errorText, ...rest } = props;

    const _id = useId();
    const hasError = errorText && !isEmpty(errorText);

    return (
        <div>
            {label && <label className="font-normal">{label}</label>}
            <div className={`${label ? 'mt-2' : 'mb-4'} w-full relative mt-2`}>
                {type === 'password' ? (
                    <PasswordInput className="h-12" {...rest} />
                ) : (
                    <Input id={`${id ?? ''}${type}-${_id}`} type={type} className={cn('h-12', className)} {...rest} />
                )}

                {hasError && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorText}</p>}
            </div>
        </div>
    );
};
