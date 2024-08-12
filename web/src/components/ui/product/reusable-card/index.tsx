import { Card } from '@shtcut-ui/react';
import React from 'react';

const ReusableCard = ({
    title,
    text,
    className,
    textClassName
}: {
    title: string;
    text: string;
    className?: string;
    textClassName?: string;
}) => {
    return (
        <Card className={`flex  shadow-sm flex-col gap-3 p-7 ${className} `}>
            <h1 className="text-2xl">{title}</h1>
            <p className={`text-sm ${textClassName} `}> {text}</p>
        </Card>
    );
};

export default ReusableCard;
