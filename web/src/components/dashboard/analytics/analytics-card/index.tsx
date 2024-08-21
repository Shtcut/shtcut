import { Button, Card } from '@shtcut-ui/react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface AnalyticsCardProps {
    id: number;
    handleCheckboxChange: (id: number, isChecked: boolean) => void;
}
const AnalyticsCard = ({ handleCheckboxChange, id }: AnalyticsCardProps) => {
    const [isChecked, setIsChecked] = useState(false);

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);
        handleCheckboxChange(id, isChecked);
    };
    return (
        <Card className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  ">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    <div className="relative checkbox-container">
                        <input
                            type="checkbox"
                            id={`qr-checkbox-${id}`}
                            checked={isChecked}
                            onChange={onCheckboxChange}
                            className="cbox"
                        />
                    </div>
                    <Image src={'/images/qrcode.png'} width={66} height={66} alt="figma" />
                    <div className="">
                        <div>
                            <h1 className="font-semibold text-sm text-[#151314]">Amazon QR Code</h1>
                            <p className="text-xs text-primary-0 font-normal">Multi-Links Website</p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-[6px]">
                            <Calendar color="#2B2829" size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">Oct 15, 2024</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className="text-xs border-primary-0 text-primary-0" variant={'outline'}>
                        Edit QR Code
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default AnalyticsCard;
