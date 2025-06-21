/** @format */

import React from 'react';
import { Loader2 } from 'lucide-react';
import classNames from 'classnames';
import { Button } from '@shtcut-ui/react';
import StarLoader from '@shtcut/components/loader/star-loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined;
    loadingText?: string;
    noStyle?: boolean;
    loadingClass?: string;
}

export const LoadingButton: React.FC<ButtonProps> = ({
    loading,
    children,
    className,
    variant = 'default',
    loadingText,
    noStyle = false,
    loadingClass,
    ...props
}) => {
    return (
        <Button
            className={classNames(
                `${noStyle ? '' : 'w-full  text-sm  h-9 flex justify-center bg-primary-0 items-center'} `,
                className
            )}
            disabled={loading}
            {...props}
            variant={variant}
        >
            {loading ? (
                <div className={`${loadingClass} flex items-center text-sm`}>
                    <StarLoader color="white" />
                    {loadingText ?? ''}
                </div>
            ) : (
                children
            )}
        </Button>
    );
};
