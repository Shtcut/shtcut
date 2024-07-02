import { Progress } from '@shtcut-ui/react';
import React from 'react';

const ReferralComponent = () => {
    const [progress, setProgress] = React.useState(50);
    const ReusableComponent = ({
        title,
        content,
        noBorder
    }: {
        title: string;
        content: string;
        noBorder?: boolean;
    }) => {
        return (
            <div className={`${noBorder ? '' : 'border-b'}  pb-4`}>
                <div className={`flex items-center justify-between py-2`}>
                    <p className="text-sm font-medium ">{title}</p>
                    <p className="text-sm font-medium ">{content}</p>
                </div>
                {!noBorder && <Progress value={progress} className="w-full h-[5px]" />}
            </div>
        );
    };
    return (
        <div className="bg-white drop-shadow-sm border border-gray-50 rounded-xl w-full py-4 px-[37px]">
            <h1 className="text-lg font-bold border-b pb-2">Referrals</h1>
            <div className="flex justify-between items-center border-b py-2">
                <p className="text-[#5b5a5b] font-medium">Websites</p>
                <p className="text-[#5b5a5b] font-medium">Clicks</p>
            </div>
            <ReusableComponent title="Direct" content="344" />
            <ReusableComponent title="shtcut.rfh" content="23" />
            <ReusableComponent title="Total Referrers:2" content="Total Clicks:33" noBorder />
        </div>
    );
};

export default ReferralComponent;
