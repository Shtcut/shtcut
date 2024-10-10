import { Card, Checkbox } from '@shtcut-ui/react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import LinkBioCardActions from '../link-card-actions';
import { PiChartBar } from 'react-icons/pi';

const LinkBioCard = () => {
    return (
        <Card className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  ">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    <div className="relative top-1">
                        <Checkbox id="terms" className="p-0 m-0 border shadow-none border-[#D2D5DA] " />
                    </div>

                    <div className="shadow border border-gray-50 w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                        <Image src={'/images/figma.png'} width={18} height={18} alt="figma" />
                    </div>
                    <div className="">
                        <div>
                            <h1 className="font-semibold text-sm text-[#151314]">Figma</h1>
                            <p className="text-xs text-primary-0 font-normal">shrtcutdribble/34567f</p>
                            <p className="text-[#2B2829] text-xs">5 Links</p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Calendar size={14} color="#2B2829" />
                            <span className="text-[#726C6C] text-xs font-medium">Oct 15, 2024</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <div
                        className={`text-xs cursor-pointer flex mx-auto items-center w-[83px] justify-center text-primary-0 rounded h-8 bg-[#F4F7FF]  font-semibold border gap-x-1 border-primary-0`}
                    >
                        <PiChartBar size={16} /> <span>30 Clicks</span>
                    </div>
                    <LinkBioCardActions />
                </div>
            </div>
        </Card>
    );
};

export default LinkBioCard;
