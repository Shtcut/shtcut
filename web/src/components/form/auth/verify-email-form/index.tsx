'use client';

import { Button, Card, Dict, Input } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import { ChangeEvent, useRef, useState } from 'react';

type VerifyEmailFormProps = {
    codeLength?: number;
    verifyEmailResponse?: Dict;
    handleVerifyEmailSubmit?: (payload: Dict) => void;
};

export const VerifyEmailPasswordForm = (props: VerifyEmailFormProps) => {
    const { verifyEmailResponse, handleVerifyEmailSubmit, codeLength = 6 } = props;
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

    return (
        <Card className=" block w-full bg-white border-b border-gray-200 p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">Verification</h3>
                    <p className="font-poppins font-thin items-center">
                        Enter the {codeLength} digits code sent to your email
                    </p>
                </div>
            </div>
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
                <Button className="w-full h-12  px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150">
                    Continue
                </Button>
            </form>
            <div className="text-center">
                <div>
                    <span className="font-poppins font-thin items-center">You didn’t receive a code?</span>
                    <Button variant="link" className="px-1 font-poppins font-thin text-blue-600 hover:text-blue-500">
                        Resend
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 w-full sm:w-64 mx-auto gap-x-4" />
        </Card>
    );
};
