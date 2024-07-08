import { Checkbox } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';
import { Calendar } from 'lucide-react';
import CardsActions from '../card-actions';

const QrCodeCard = () => {
    return (
        <div>
            <div className="bg-white  cursor-pointer rounded-[10px] p-4 border bg-card ">
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-3">
                        <div className="relative ">
                            <Checkbox id="terms" className="p-0 m-0 border shadow-none border-[#D2D5DA] " />
                        </div>
                        <Image src={'/images/qrcode.png'} width={66} height={66} alt="figma" />
                        <div className="">
                            <div>
                                <h1 className="font-semibold text-[#151314]">Amazon QR Code</h1>
                                <p className="text-sm text-primary-0 font-normal">Multi-Links Website</p>
                            </div>
                            <div className="flex items-center gap-x-2 mt-[6px]">
                                <Calendar color="#2B2829" size={16} />
                                <span className="text-[#726C6C] text-xs font-medium">Oct 15, 2024</span>
                            </div>
                        </div>
                    </div>
                    <CardsActions />
                </div>
            </div>
        </div>
    );
};

export default QrCodeCard;
