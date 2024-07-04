import { Card, Progress } from '@shtcut-ui/react';
import Image from 'next/image';
import React, { ReactNode } from 'react';

const CountriesComponent = () => {
    const [progress, setProgress] = React.useState(50);
    const ReusableComponent = ({
        title,
        content,
        noBorder,
        src
    }: {
        title: ReactNode;
        content: string;
        noBorder?: boolean;
        src: string;
    }) => {
        return (
            <div className={`${noBorder ? '' : 'border-b'}  pb-4`}>
                <div className={`flex items-center justify-between py-2`}>
                    <div className="flex items-center gap-x-2">
                        <Image src={src} width={24} height={24} alt={title as string} />
                        <p className="text-sm font-medium ">{title}</p>
                    </div>
                    <p className="text-sm font-medium ">{content}</p>
                </div>
                {!noBorder && <Progress value={progress} className="w-full h-[5px]" />}
            </div>
        );
    };
    return (
        <div className="bg-white w-full rounded-xl py-4 px-[37px]  border bg-card ">
            <h1 className="text-lg font-bold border-b pb-2">Countries</h1>
            <div className="flex justify-between items-center border-b py-2">
                <p className="text-[#5b5a5b] font-medium">Name</p>
                <p className="text-[#5b5a5b] font-medium">Clicks</p>
            </div>
            <ReusableComponent src="/images/ng.png" title="United states" content="10" />
            <ReusableComponent src="/images/ng.png" title="Nigeria" content="23" />
            <ReusableComponent src="/images/ng.png" title="Ghana" content="2" />
        </div>
    );
};

export default CountriesComponent;
