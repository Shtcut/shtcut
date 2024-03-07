'use client';

import { Dict, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, cn } from '@shtcut-ui/react';
import { AppButton } from '@shtcut/components/_shared';
import { ChangeEvent, HTMLAttributes, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { resetPasswordCodeValidationSchema } from './validation';

interface VerifyEmailFormProps extends HTMLAttributes<HTMLDivElement> {
    codeLength: number;
    isLoading: boolean;
    handleVerifyEmailSubmit: (payload: Dict) => void;
}

export const VerifyEmailPasswordForm = (props: VerifyEmailFormProps) => {
    const { isLoading, handleVerifyEmailSubmit, codeLength = 6, className } = props;
    const fieldsRef = useRef<any>();

    const codes = new Array(codeLength).fill('code').reduce((acc, curr, idx) => {
        acc[`${curr}${idx + 1}`] = '';
        return acc;
    }, {});

    const [code, setCode] = useState(codes);

    const inputFocus = (e) => {
        const elements = fieldsRef?.current.children;
        const dataIndex = +e.target.getAttribute('data-index');
        if (e.key === 'Delete' || e.key === 'Backspace') {
            const next = dataIndex - 1;
            if (next > -1) {
                elements[next].focus();
            }
        } else {
            const next = dataIndex + 1;
            if (next < elements.length && e.target.value != ' ' && e.target.value != '' && e.key.length == 1) {
                elements[next].focus();
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, codeNumber: string) => {
        const value = e.target.value;
        setCode({ ...code, [codeNumber]: value.slice(value.length - 1) });
    };

    const handleFormSubmit = () => {
        const value = Object.values(code).reduce((acc: string, curr) => (acc += curr), '');
        handleVerifyEmailSubmit({
            verificationCode: String(value)
        });
    };

    const form = useForm<z.infer<typeof resetPasswordCodeValidationSchema>>({
        resolver: zodResolver(resetPasswordCodeValidationSchema),
        defaultValues: {
            resetPassCode: ''
        }
    });

    return (
        <div className={cn('grid gap-9 mx-auto px-4 md:px-8', className)}>
            <form className="space-y-5 w-[96] mx-auto md:w-2/3 items-center">
            <div ref={fieldsRef} className="mt-2 flex items-center justify-center gap-x-2">
                {Object.keys(codes).map((key, idx) => {
                    const value = code[key];
                    return (
                        <Input
                            key={key}
                            data-index={idx}
                            placeholder="0"
                            value={value}
                            className="w-12 h-12 rounded-lg ml-3 outline-none border focus:border-blue-600 outline text-center text-2xl"
                            onChange={(e) => handleChange(e, key)}
                            onKeyUp={inputFocus}
                        />
                    );
                })}
            </div>
            <AppButton
                onClick={handleFormSubmit}
                type="button"
                loading={isLoading}
                disabled={isLoading}
                className="w-full h-12  px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
            >
                Continue
            </AppButton>
        </form>
        </div>
    );
};
